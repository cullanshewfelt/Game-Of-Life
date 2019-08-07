/*global window: false, console:false */
// Wrap the entire code in a function to avoid polluting the global scope
(function() {
    "use strict";
    // Using strict mode means the browser will throw errors if we make
    // common mistakes, which saves us debugging.
    var conway = {};
    conway.maingame = function(width, height) {
        // Make sure we declare our variables as local, not implied globals.
        var i;
        // It's bad practice to use `new Array()`, it's slow and confusing.
        window.a = [];
        this.width = width;
        this.height = height;
        this.map = [];
        for (i = 0; i < this.width; i++) {
            this.map[i] = [];
        }
        console.log(this.map, "map");
    };

    conway.maingame.prototype.randomize = function() {
        var y, x, i;
        for (y = 0; y < this.height; y++) {
            //console.log("enter for loop")
            for (x = 0; x < this.width; x++) {
                // Better to use '0.5' to be clear this is a number.
                if (Math.random() > 0.5) {
                    i = true;
                } else {
                    i = false;
                }
                //console.log("enter function")
                this.set(x, y, i);
            }
        }
    };

    conway.maingame.prototype.set = function(x, y, val) {
        x = x % this.width;
        y = y % this.height;
        this.map[x][y] = val;
        console.log(this.map, "map2");
    };

    conway.maingame.prototype.get = function(x, y) {
        x = x % this.width;
        y = y % this.height;
        return this.map[x][y];
    };

    conway.maingame.prototype.neighbours = function(x, y) {
        var count = 0;
        if (x > 0 && y > 0 && this.get(x + 1, y + 1)) {
            console.log(this.get(x + 1, y + 1), "value neighbour");
            count++;
            console.log(count);
        }
        if (x > 0 && y > 0 && this.get(x + 1, y)) {
            console.log(this.get(x + 1, y), "value neighbour");
            count++;
            console.log(count);
        }

        if (x > 0 && y > 0 && this.get(x + 1, y - 1)) {
            console.log(this.get(x + 1, y - 1), "value neighbour");
            count++;
            console.log(count);
        }

        if (x > 0 && y >= 0 && this.get(x, y - 1)) {
            console.log(this.get(x + 1, y - 1), "value neighbour");
            count++;
            console.log(count);
        }

        if (x > 0 && y > 0 && this.get(x - 1, y - 1)) {
            console.log(this.get(x + 1, y - 1), "value neighbour");
            count++;
            console.log(count);
        }

        if (x > 0 && y > 0 && this.get(x - 1, y)) {
            console.log(this.get(x + 1, y - 1), "value neighbour");
            count++;
            console.log(count);
        }

        if (x > 0 && y > 0 && this.get(x - 1, y + 1)) {
            console.log(this.get(x + 1, y - 1), "value neighbour");
            count++;
            console.log(count);
        }

        if (x > 0 && y > 0 && this.get(x, y + 1)) {
            console.log(this.get(x + 1, y - 1), "value neighbour");
            count++;
            console.log(count);
        }

        return count;
    };

    conway.maingame.prototype.newgeneration = function() {
        var i, x, y, newMap = [];
        for (i = 0; i < this.width; i++) {
            newMap[i] = [];
        }
        for (y = 0; y < this.height; y++) {
            for (x = 0; x < this.width; x++) {
                console.log("enter all for");
                newMap[x][y] = this.get(x, y);
                console.log(newMap, "newarray");
                //Rule 1: any live cell with fewer than two live neighbours dies
                //Use === and !===, not == and !=
                if (this.get(x, y) === true && this.neighbours(x, y) < 2) {
                    newMap[x][y] = false;
                    console.log("rule1");
                }
                //Rule 2: Any live cell with two or three live neighbours lives on to the next generation
                if ((this.get(x, y) === true && this.neighbours(x, y) === 2) || this.neighbours(x, y) === 3) {
                    newMap[x][y] = true;
                    console.log("rule2");
                }
                //Rule 3: any live cell with more than three live neighbours dies
                if (this.get(x, y) === true && this.neighbours(x, y) > 3) {
                    newMap[x][y] = false;
                    console.log("rule3");
                }
                //Rule 4: any dead cell with exactly three live neighbours becomes a live cell
                if (this.get(x, y) === false && this.neighbours(x, y) === 3) {
                    newMap[x][y] = true;
                    console.log("rule4");
                }
            }
        }
        this.map = newMap;
        console.log(this.map, "new generation");
    };

    // And here's a little test to check that it all worked!
    var test = new conway.maingame(10, 10);
    test.randomize();

    var table = document.getElementById('output');

    // Note: This is obviously pretty slow. Don't actually do this...
    var plot = function() {
        table.innerHTML = "";
        for (var r = 0; r < test.map.length; r++) {
            var row = table.insertRow(-1);
            for (var c = 0; c < test.map[r].length; c++) {
                var cell = row.insertCell(-1);
                cell.appendChild(document.createTextNode(test.map[r][c] ? "✖" : " "));
            }
        }
    };

    var plotNew = function() {
        test.newgeneration();
        plot();
    };

    window.plotNew = plotNew;

    plot();
}());
