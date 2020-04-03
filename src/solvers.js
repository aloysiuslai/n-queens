/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  /* IOCE
      I - integer n
      O - 0 or 1; 0 if it does find any solution; and one is if it does;

      step 1 : create a nXn empty board;
      step 2 : we input the board into the function;
              inside recursive function if it has row or col conflict return nothing; else recall the function on the next row;
              if row = n - 1; if no row or column colflict then solution++; then return nothing;

              [[0,0],[0,0]]
  */
  var solution = 0; //fixme
  var oneTracker = [];
  var boardPopulator = function(obj) {
    var matrix = obj.rows(); // [[0,0],[0,0]] -- [[1,0], [0,0]]
    console.log(matrix, 'matrix start')

    for (var i = 0; i < matrix.length; i++) { // i = 0 -- 0
      var row = matrix[i]; // [0,0] -- [1, 0]

      for (var j = 0; j < row.length; j++) { // j = 0 -- 1
        var element = row[j]; // 0 -- 0
        // if element is 1 then break
        if (element === 1) { // 0 === 1 -- 0 === 1
          continue;
        }
        obj.togglePiece(i, j); // change to 1
        console.log(row, 'row' + i)

        if (obj.hasAnyColConflicts()) {
          console.log('C conflict' + i + ", " + j);
          obj.togglePiece(i, j);
          continue;
        }

        if (obj.hasAnyRowConflicts()) {
          console.log('R conflict' + i + ", " + j);
          obj.togglePiece(i, j);
          break;
        }

        if (i === matrix.length - 1) { // 0 === 1, false
          solution++;

          console.log(solution, 'solutions')
          console.log(JSON.stringify(matrix), 'solution matrix')
          obj.togglePiece(i, j);
          // var popped = oneTracker.pop()
          // obj.togglePiece(popped[0], popped[1])
          continue;
        }
        oneTracker.push([i,j])
        console.log(oneTracker, 'OneTracker');
        boardPopulator(obj); // [[1,0], [0,0]]
      }
    }
  };

  var newBoard = new Board({'n': n });
  // console.log(newBoard.rows(), 'newBoard')
  boardPopulator(newBoard);

  if ( solution > 0) { solution = 1; }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
