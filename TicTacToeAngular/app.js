angular.module("game", [])
.controller('GameCtrl', function($scope) {
  var numRows = 3;
  var numCols = 3;
  $scope.setPlayers = function(numPlayers) {
    $scope.numPlayers = numPlayers;
  };
  $scope.stage = "pick";
  $scope.next = function() {
    if ($scope.stage == "pick") {
      $scope.stage = "game";
    }
  }

  $scope.winLength = 3;
  $scope.winningPlayer = 0;  // 0 --> no winner
  var currentPlayer = 1;
  $scope.squares = [];
  $scope.play = function(row, col) {
    var alreadyOwned = $scope.squares[row][col] !== 0;
    if (!alreadyOwned) {
      $scope.squares[row][col] = currentPlayer;
      currentPlayer = currentPlayer === $scope.numPlayers ? 1 : currentPlayer + 1;

      $scope.winningPlayer = checkWin();
      if ($scope.winningPlayer !== 0) {
        $scope.showWin = true;
      } else if (boardFilled()) {
        $scope.showTye = true;
      }
    }
  };
  $scope.reset = function() {
    $scope.showWin = false;
    $scope.showTye = false;
    $scope.squares = [];
    for (var r = 0; r < numRows; r++) {
      var row = [];
      $scope.squares.push(row);
      for (var c = 0; c < numCols; c++) {
        row.push(0);
      }
    }
  };
  function checkWin() {
    var squares = $scope.squares;
    var numInARow = 0;
    var currentPlayer = null;
    var prevPlayer = null;
    // loop through cols
    for (var r = 0; r < numRows; r++) {
      numInARow = 0;
      currentPlayer = null;
      prevPlayer = null;
      for (var c = 0; c < numCols; c++) {
        prevPlayer = currentPlayer;
        currentPlayer = squares[r][c];
        if (currentPlayer === prevPlayer) {
          numInARow = numInARow + 1;
        } else {
          numInARow = 1;
        }
        if (currentPlayer !== 0 && numInARow === $scope.winLength) {
          return currentPlayer;
        }
      }
    }
    // loop through rows
    for (var c = 0; c < numCols; c++) {
      numInARow = 0;
      currentPlayer = null;
      prevPlayer = null;
      for (var r = 0; r < numRows; r++) {
        prevPlayer = currentPlayer;
        currentPlayer = squares[r][c];
        if (currentPlayer === prevPlayer) {
          numInARow = numInARow + 1;
        } else {
          numInARow = 1;
        }
        if (currentPlayer !== 0 && numInARow === $scope.winLength) {
          return currentPlayer;
        }
      }
    }

    for (var r = 1; r < numRows - 1; r++) {
      numInARow = 0;
      currentPlayer = null;
      prevPlayer = null;

      for (var c = 1; c < numCols - 1; c++) {
        prevPlayer = currentPlayer;
        currentPlayer = squares[r][c];
        if (currentPlayer === prevPlayer) {
          numInARow = numInARow + 1;
        } else {
          numInARow = 1;
        }
        if (squares[r][c] !== 0) {
          if ( squares[r - 1][c - 1] === squares[r][c] && squares[r][c] === squares[r + 1][c + 1]) {
            return currentPlayer;
          } else if (currentPlayer !== 0 && numInARow === $scope.winLength || squares[r - 1][c + 1] === squares[r][c] && squares[r][c] === squares[r + 1][c - 1]) {
            return currentPlayer;
          }
        }
      }
    }

    return 0;
  };

  function boardFilled() {
    for (var r = 0; r < numRows; r++) {
      for (var c = 0; c < numCols; c++) {
        if ($scope.squares[r][c] === 0) {
          return false;
        }
      }
    }
    return true;
  }
  $scope.reset();
});
