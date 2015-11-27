var solutions = {};

solutions.fake_fakovich = function (Board) {
    function pauseComp(ms) {
        var curr = new Date().getTime();
        ms += curr;
        while (curr < ms) {
            curr = new Date().getTime();
        }
    }

    pauseComp(Math.random() * 2000);
    return Array(5);

};


// YOUR SOLUTION
solutions.boiko_natalia = function (Board) {

    var findPath = function (matrix) {
        var start = {};
        var finish = {};
        var currentLocation;
        var newPath;

        //Find coordinates of start
        for (var i = 0; i < matrix.length; i++){
            if (matrix[i].indexOf('s') !== -1) {
                start.t = i;
                start.l = matrix[i].indexOf('s');
                break;
            }
        }

        //Find coordinates of end
        for (var i = 0; i < matrix.length; i++){
            if (matrix[i].indexOf('f') !== -1) {
                finish.t = i;
                finish.l = matrix[i].indexOf('f');
                break;
            }
        }

        //Options for points to check (difference from start(currentLocation) point)
        var steps = [
          {
            't': 1,
            'l': 2
          }, 
          {
            't': -1,
            'l': -2
          },
          {
            't': 2,
            'l': 1
          },
          {
            't': -2,
            'l': -1
          },
          {
            't': 2,
            'l': -1
          },
          {
            't': -2,
            'l': 1
          },
          {
            't': 1,
            'l': -2
          },
          {
            't': -1,
            'l':  2
          },
        ];

        // Initialize the queue with the start location already inside
        var queue = [{
          t: start.t,
          l: start.l,
          path: []
        }];

        // Loop through the grid searching for the goal
        while (queue.length > 0) {
            currentLocation = queue.shift();

            for (var i = 0; i < steps.length; i++){
                //Check if point is not out of grid
                if (currentLocation.t + steps[i].t > 0 && currentLocation.t + steps[i].t < matrix.length && currentLocation.l + steps[i].l > 0 && currentLocation.l + steps[i].l < matrix[0].length) {
                    //Check if cell is free from obstacles and was not visited before
                    if (matrix[currentLocation.t + steps[i].t][currentLocation.l + steps[i].l] === 0) {
                        newPath = currentLocation.path.slice();
                        newPath.push([currentLocation.t + steps[i].t,currentLocation.l + steps[i].l]);
                        queue.push({
                          t: currentLocation.t + steps[i].t,
                          l: currentLocation.l + steps[i].l,
                          path: newPath
                        });

                        matrix[currentLocation.t + steps[i].t][currentLocation.l + steps[i].l] = -1;
                    } else if (matrix[currentLocation.t + steps[i].t][currentLocation.l + steps[i].l] === 'f') {
                        newPath = currentLocation.path.slice();
                        newPath.push([currentLocation.t + steps[i].t,currentLocation.l + steps[i].l]);
                        return newPath;
                    }
                }
            }

        }

        return null;
    }

    return findPath(Board);
};


// YOUR SOLUTION
solutions.dobrooskok_yaroslav = function (Board) {
    // GOES HERE
};


// YOUR SOLUTION
solutions.kozynets_oleg = function (Board) {
    //пошук у матриці
    function findInMatrix(matrix, element){
        var res;
        matrix.forEach(function ( el, index) { el.forEach(function (em, ins) {
            if (em == element) res = [index, ins]})});
        return res;
    }
//перевірка чи є змінна масивом
    function isArray(myArray) {
        return myArray.constructor.toString().indexOf("Array") > -1;
    }
//створимо клас, де збірігатимемо координати вершин
    function Point (x, y, parent) {
        this.X = x,
            this.Y = y,
            this.Parent = parent
    };
    Point.prototype = {
        toString: function () {
            return "("+this.X+", "+ this.Y+")";
        },
        toArray: function () {
            return [this.X, this.Y];
        },
        isEqualTo: function (obj) {
            if (obj instanceof Point) {
                if((this.X === obj.X)&&(this.Y === obj.Y)) return true;
            } else return false;
        }
    };
//функція поширення(робимо один хід)
    function NextSteps (coordinates, board, dimension){
        var x,y;
        var result = [];
        if (!dimension)  dimension = board.length;
        if (isArray(coordinates)){
            for (var i= 0, l = coordinates.length; i<l;i++){
                x = coordinates[i].X, y = coordinates[i].Y;
                if (y + 2 < dimension) {
                    //строго менше N тому що у масиві найвищий індекс N-1
                    if ((x + 1 < dimension) && (board[x + 1][y + 2] === 0)) {
                        result.push(new Point(x + 1, y + 2, coordinates[i]));
                        board[x + 1][y + 2] = 1;
                    }
                    if ((x - 1 >= 0) && (board[x - 1][y + 2] === 0)) {
                        result.push(new Point(x - 1, y + 2, coordinates[i]));
                        board[x - 1][y + 2] = 1;
                    }
                }
                ;
                if (x + 2 < dimension) {
                    if ((y + 1 < dimension) && (board[x + 2][y + 1] === 0)) {
                        result.push(new Point(x + 2, y + 1, coordinates[i]));
                        board[x + 2][y + 1] = 1;
                    }
                    if ((y - 1 >= 0) && (board[x + 2][y - 1] === 0)) {
                        result.push(new Point(x + 2, y - 1, coordinates[i]));
                        board[x + 2][y - 1] = 1;
                    }
                }
                ;
                if (y - 2 >= 0) {
                    //строго менше N тому що у масиві найвищий індекс N-1
                    if ((x + 1 < dimension) && (board[x + 1][y - 2] === 0)) {
                        result.push(new Point(x + 1, y - 2, coordinates[i]));
                        board[x + 1][y - 2] = 1
                    }
                    if ((x - 1 >= 0) && (board[x - 1][y - 2] === 0)) {
                        result.push(new Point(x - 1, y - 2, coordinates[i]));
                        board[x - 1][y - 2] = 1;
                    }
                }
                ;
                if (x - 2 >= 0) {
                    if ((y + 1 < dimension) && (board[x - 2][y + 1] === 0)) {
                        result.push(new Point(x - 2, y + 1, coordinates[i]));
                        board[x - 2][y + 1] = 1
                    }
                    if ((y - 1 >= 0) && (board[x - 2][y - 1] === 0)) {
                        result.push(new Point(x - 2, y - 1, coordinates[i]));
                        board[x - 2][y - 1] = 1;
                    }
                }
                ;
            }
            if (result.length) return result; else return null;
        }
        else {
            x = coordinates.X, y = coordinates.Y;
            if (y + 2 < dimension) {
                //строго менше N тому що у масиві найвищий індекс N-1
                if ((x + 1 < dimension) && (board[x + 1][y + 2] === 0)) {
                    result.push(new Point(x + 1, y + 2, coordinates));
                    board[x + 1][y + 2] = 1;
                }
                if ((x - 1 >= 0) && (board[x - 1][y + 2] === 0)) {
                    result.push(new Point(x - 1, y + 2, coordinates));
                    board[x - 1][y + 2] = 1;
                }
            }
            ;
            if (x + 2 < dimension) {
                if ((y + 1 < dimension) && (board[x + 2][y + 1] === 0)) {
                    result.push(new Point(x + 2, y + 1, coordinates));
                    board[x + 2][y + 1] = 1;
                }
                if ((y - 1 >= 0) && (board[x + 2][y - 1] === 0)) {
                    result.push(new Point(x + 2, y - 1, coordinates));
                    board[x + 2][y - 1] = 1;
                }
            }
            ;
            if (y - 2 >= 0) {
                //строго менше N тому що у масиві найвищий індекс N-1
                if ((x + 1 < dimension) && (board[x + 1][y - 2] === 0)) {
                    result.push(new Point(x + 1, y - 2, coordinates));
                    board[x + 1][y - 2] = 1
                }
                if ((x - 1 >= 0) && (board[x - 1][y - 2] === 0)) {
                    result.push(new Point(x - 1, y - 2, coordinates));
                    board[x - 1][y - 2] = 1;
                }
            }
            ;
            if (x - 2 >= 0) {
                if ((y + 1 < dimension) && (board[x - 2][y + 1] === 0)) {
                    result.push(new Point(x - 2, y + 1, coordinates));
                    board[x - 2][y + 1] = 1
                }
                if ((y - 1 >= 0) && (board[x - 2][y - 1] === 0)) {
                    result.push(new Point(x - 2, y - 1, coordinates));
                    board[x - 2][y - 1] = 1;
                }
            }
            ;
        }
        if (result.length) return result; else return null;
    }
//основна функція
        var board = Board;
        var sstart = findInMatrix(board, "s");
        var eend = findInMatrix(board, "f");
        var start = new Point(sstart[0], sstart[1]);
        var end = new Point(eend[0], eend[1]);
        var steps = 0, tree = [];
        var dim = board.length;
        board[eend[0]][eend[1]] = 0;
        board[sstart[0]][sstart[1]] = 0;//

        //перевірка того чи кінець і початок співпадають
        if (start.isEqualTo(end)) return null;//return {
        //NumberOfSteps: 0,
        // Path: undefined
        //};
        else {//якщо задано різні точки
            tree.push(start);//вершина дерева
            //гілки та листя дерева
            do {
                tree.push(NextSteps(tree[steps], board, dim));
                steps++;
                if (tree[steps].some(function (el){ return el.isEqualTo(end)}))
                {
                    var resArr = [], result = [];//запишемо сюди шлях
                    //знаходимо останню вершину графа
                    for(var j = 0, l = tree[steps].length; j<l; j++){
                        if(tree[steps][j].isEqualTo(end)) {
                            resArr.push(tree[steps][j]);
                            break;
                        }
                    }
                    //рухаємося вверх до початку
                    for(var i = 0; i<steps; i++){
                        resArr.push(resArr[i].Parent);
                    }
                    for (var i = 0; i<=steps; i++){
                        result.push(resArr[i].toArray());
                    }
                    return result;//{NumberOfSteps: steps,
                    // Path: resArr};
                }
            } while(tree[steps]);

            return null;//{
            //NumberOfSteps: 0,
            //Path: undefined
            //};
        }

};


// YOUR SOLUTION
solutions.maltsev_valerii = function (Board) {
    // GOES HERE
    // return array of points that are available from base point on specified map
function getAvailablePoints(basePoint, map) {
    var res = [
        [basePoint[0] + 2, basePoint[1] + 1],
        [basePoint[0] + 2, basePoint[1] - 1],
        [basePoint[0] + 1, basePoint[1] + 2],
        [basePoint[0] + 1, basePoint[1] - 2],
        [basePoint[0] - 2, basePoint[1] + 1],
        [basePoint[0] - 2, basePoint[1] - 1],
        [basePoint[0] - 1, basePoint[1] + 2],
        [basePoint[0] - 1, basePoint[1] - 2]
    ];

    // check every res for
    // 1. penalty (as -1 in the map),
    // 2. passed (as 1 in the map),
        // or check for equals 0 || 'f';

    // 3. out of field ( x, y > map.length or < 0) through the map

    var newRes = [];
    var j = -1;
    while (++j < 8) {
        if ( isInField(res[j], map) ) {
            if (map[ res[j][0] ][ res[j][1] ] == 0 || map[ res[j][0] ][ res[j][1] ] == 'f') {
                newRes.push(res[j]);
            }
        }
    }

    // set map[point] to passed
    var i = -1, len = newRes.length;
    while (++i < len) {
        map[newRes[i][0]][newRes[i][1]] = 1;
    }

    return newRes;
}

// return XY of point with specified char on map
function getPointByChar(map, char) {
    if(char) {
        for(var i = 0; i < map.length; i++) {
            for( var j = 0; j < map[i].length; j++) {
                if(map[i][j] == char) {
                    return [i, j];
                }
            }
        }
    }
}

// is point in the map area
function isInField(point, map) {
    if(point[0] >= 0 && point[0] < map.length) {
        if(point[1] >= 0 && point[1] < map[0].length) {
            return true;
        }
    }
    return false;
}

// return the shortest way from start point 's' to end point 'f' as an array of points
// map format :
    // 's' - start point
    // 'f' - finish point
    // 0 - default point
    // -1 - penalty point
    // 1 - passed point
function getShortcut(map) {
    var queue = [];
    var current;
    var j;
    var isFinish = false;
    var start = getPointByChar(map, 's');
    var finish = getPointByChar(map, 'f');
    var shortcut = [];

    map[start[0]][start[1]] = 1;
    queue.push(start);

    j = 0;
    // 1. end loop if finish == true
    // 2. end loop if j >= queue.length;
    while(!isFinish) {

        current = queue[j];

        // if current point is finish
        if(current[0] == finish[0] && current[1] == finish[1]) {
            isFinish = true;
            break;
        }

        // find available points[] from current
        var avp = getAvailablePoints(current, map);
        var avpLen = avp.length;
        var k = -1;
        while(++k < avpLen) {
            if(avp[k] !== undefined) {
                avp[k].parent = current;
                queue.push(avp[k]);
            }
        }

        // j-criteria of process end
        if(j++ == queue.length - 1) {
            isFinish = false;
            break;
        }
    }

    //if (finish) create and return points of shortcut
    // through parent.parent ... from last finish point (current)
    if(isFinish) {
        while(current) {
            shortcut.push(current);
            current = current.parent;
        }
        return shortcut;
    } else {
        throw new Error("No way to finish");
    }
}

	return getShortcut(Board);
};


// YOUR SOLUTION
solutions.martyniuk_oleksandra = function (Board) {
    // GOES HERE
};


// YOUR SOLUTION
solutions.melnykov_andrii = function (Board) {
    // GOES HERE
};


// YOUR SOLUTION
solutions.pylhun_valerii = function (Board) {
    // GOES HERE
};


// YOUR SOLUTION
solutions.vaskovska_anna = function (Board) {
    // GOES HERE
};