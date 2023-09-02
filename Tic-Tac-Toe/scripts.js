window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    const resetBoard = () => {
      board = ['', '', '', '', '', '', '', '', ''];
      tiles.forEach((tile) => {
        tile.innerText = '';
        tile.classList.remove('playerX', 'playerO', 'winning-tile', 'announcer');
      });
      currentPlayer = 'X';
      playerDisplay.innerText = currentPlayer;
      playerDisplay.classList.add(`player${currentPlayer}`);
      isGameActive = true;
      announcer.classList.add('hide');
    };
    
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
     ];

    const isValidAction = (tile) => {
      if (tile.innerText === 'X' || tile.innerText === 'O'){
          return false;
      }
  
      return true;
    };

    const updateBoard =  (index) => {
        board[index] = currentPlayer;
     }

     const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const announce = (type) => {
        switch(type){
           case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won!';
                break;
           case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won!';
                break;
           case TIE:
                announcer.innerText = "It's a Tie!";
            }
        announcer.classList.remove('hide');
    };

    function handleResultValidation() {
      let roundWon = false;
      for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];
        if (a === "" || b === "" || c === "") {
          continue;
        }
        if (a === b && b === c) {
          roundWon = true;
          // Add a class to the winning tiles
          tiles[winCondition[0]].classList.add("winning-tile");
          tiles[winCondition[1]].classList.add("winning-tile");
          tiles[winCondition[2]].classList.add("winning-tile");
          break;
        }
      }
    
      if (roundWon) {
        handleGameResult(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
        return;
      }
    
      if (!board.includes("")) handleGameResult(TIE);
    }

    const handleGameResult = (result) => {
      isGameActive = false;
      switch (result) {
        case PLAYERX_WON:
          announce(PLAYERX_WON);
          break;
        case PLAYERO_WON:
          announce(PLAYERO_WON);
          break;
        case TIE:
          announce(TIE);
          break;
      }
      // Display an alert with a restart button
      setTimeout(() => {
        const restart = confirm("Game Over! Do you want to play again?");
        if (restart) {
          resetBoard();
          // Reset any additional UI changes, such as removing the winning-tile class
          tiles.forEach((tile) => tile.classList.remove("winning-tile"));
        }
      }, 100);
    };

      const userAction = (tile, index) => {
        if (isValidAction(tile) && isGameActive) {
          tile.innerText = currentPlayer;
          tile.classList.add(`player${currentPlayer}`);
          updateBoard(index);
          handleResultValidation();
          changePlayer();
        }
      };

      tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);
  });