// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // Check if row array have multiple 1s
      /**
       * IOCE
       * input: number; the index of the row;
       * output: boolean; if more than two 1's returns true else return false
       *
       * this.attribute = { 0 : arr1,
       *                    1 : arr2,
       *                    2 : arr3
       *                  }
       *
       */

       var count = 0;
       for ( var key in this.attributes) {
        if ( key === rowIndex) {
          var row = this.attributes[key];
          for ( var num of row) {
            if ( num === 1) {
              count++;
            }
          }
        }
      }
      return (count > 1)
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      /* -----------------------------------------------------
      IOCE
      I: N/A
      O: boolean depending if all row return true or false
      find out how many keys there are in this.attributes;
      call this.hasRowConflictAt(different keys here)

      E: if key = 'n'
      */

      for ( var arr in this.attributes) {
        if ( arr === "n") continue;
        if (this.hasRowConflictAt(arr)) return true;
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      /* -----------------------------------------------------------
      IOCE
      I: number, to indicate what column of the matrix we are iterating through
      O: boolean; if more than two 1's in a column return true;
      C: N/A
      E: TBD;

      return false; // fixme

      create a count var;
      loop though this.attributes;
      we in each attribute; count++ when key ==1
      if count is greater than 1, then there's conflict
      */
     var count = 0;

      for ( var key in this.attributes) {
        // do an if, so this.attributes[key][colIndex]] === 1, count ++
        if (this.attributes[key][colIndex] === 1) count++;
      }
      return count > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // return false; // fixme
      /**
       * input: N/A;
       * output: boolean; if there are any col conflicts in the martix;
       * edge case: when this.attributes[key] === 'n', then continue;
       */
      for ( var arr in this.attributes) {
        if ( arr === "n") continue;
        if (this.hasColConflictAt(arr)) return true;
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(startingI,startingJ, n) {
      var count = 0;// 1
      var i = startingI;// i = 3, n = 4
      var j = startingJ;// j = 0

      while ( true ) {
        if (i === n || j === n) {// 3 !== 4
          break;
        }
        if ( this.attributes[i][j] === 1) {
          count++;
        }
        i++;// i = 4
        j++;// j = 1
      }
      return count > 1
      // return false; // fixme
      /* IOCE
        I: i and j for coordinate location
        O: boolean to determine conflicts

        i would the key of this.attributes, j would be index of this.attributes[key]
        Compare the element(0 or 1) at this.attributes[i][j]
        if element is 1, then add to count
        move to next element i++ and j++ -> this.attributes[i++][j++], if i or j = n - 1, return count > 1;
       */
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // return false; // fixme
      /**
       * step 1; to start from the bottom left; i : n - 1 and j : 0; then call the function
       * step 2 : i-- loop till i = 0 then move right (j++)
       * step 3 : return count > 1;
       */
      var n = this.attributes[0].length;
      var i = n - 1;
      var j = 0;

      while (true) {
        if ( i !== 0) {
          if (this.hasMajorDiagonalConflictAt(i, j , n)) return true;
          i--;
        } else if ( j !== n - 1) {
          if (this.hasMajorDiagonalConflictAt(i, j , n)) return true;
          j++;
        } else {
          if (this.hasMajorDiagonalConflictAt(i, j , n)) return true;
          break;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(startingI, startingJ, n) {
      var count = 0;// 1
      var i = startingI;// i = 3, n = 4
      var j = startingJ;// j = 0

      while ( true ) {
        if (i === n || j === n) {// 3 !== 4
          break;
        }
        if ( this.attributes[i][j] === 1) {
          count++;
        }
        i++;//
        j--;// j = 1
      }
      return count > 1
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var n = this.attributes[0].length;
      var i = n - 1;
      var j = n - 1;

      while (true) {
        if ( i !== 0) {
          if (this.hasMinorDiagonalConflictAt(i, j , n)) return true;
          i--;
        } else if ( j !== 0) {
          if (this.hasMinorDiagonalConflictAt(i, j , n)) return true;
          j--;
        } else {
          if (this.hasMinorDiagonalConflictAt(i, j , n)) return true;
          break;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());

