import React, { useState, useEffect } from 'react';


const Board = () => {


    const [board, setBoard] = useState(Array(9).fill(null));

    const [currentPlayer, setCurrentPlayer] = useState('X'); // Player with "X" will start the game

    const [winner, setWinner] = useState(null);

    // Use side effect to check after each state change
    useEffect(() => {
        const winner = checkWinner(board);
        if (winner) {
          console.log(`Player ${winner} wins!`);
          setWinner(winner)
        } else if (isBoardFull(board)) {
            setWinner('draw'); // Set the winner state to 'draw' if the board is full with no winner
          }
      }, [board]);

      


    const handleClick = (index) => {

        if (board[index] === null) {                    //only work if clicked cell is empty

            const updatedBoard = [...board];   // Create a copy to not modify the board directly
            updatedBoard[index] = currentPlayer;  

            setBoard(updatedBoard);

            setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X') // Sets  current player to opposite of player that played the last move

        };
    };



    const resetGame = () => {
        setBoard(Array(9).fill(null)); // Reset the board state
        setCurrentPlayer('X'); // Set the current player back to 'X'
        setWinner(null)
    };
    
    const renderCell = (index) => {
        return (
            <div className='cell'onClick={() => handleClick(index)}>
                {board[index]}
            </div>

        );

    };



    //Return the entire board
    return (
        <div>
          <div className="board">
            <div className="row">
              {renderCell(0)}
              {renderCell(1)}
              {renderCell(2)}
            </div>
            <div className="row">
              {renderCell(3)}
              {renderCell(4)}
              {renderCell(5)}
            </div>
            <div className="row">
              {renderCell(6)}
              {renderCell(7)}
              {renderCell(8)}
            </div>
          </div>
          {winner && (
            <div>
              {winner === 'draw' ? (
                <h2>It's a draw!</h2>
              ) : (
                <h2>Player {winner} wins!</h2>
              )}
              <button className='button' onClick={resetGame}>Reset Game</button>
            </div>
          )}
        </div>
      );
};


const checkWinner = (board) => {
    // Define winning combinations
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];
  
    // Iterate through winning combinations
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
  
      // Check if the three cells have the same player's symbol
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Return the winner (X or O)
      }
    }
  
    // No winner found
    return null;

};

const isBoardFull = (board) => {
    return board.every((cell) => cell !== null);
};

  
export default Board;