import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './index.css';


const Board = () => {
  const initialSquares = Array(9).fill(null);
  const [squares, setSquares] = useState(initialSquares);
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false); 

  const handleClickEvent = (i) => {
    const newSquares = [...squares];

    const winnerDeclared = calculateWinner(newSquares);
    const squareFilled = Boolean(newSquares[i]);

    if (winnerDeclared || squareFilled) {
      return;
    }

    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    const currentWinner = calculateWinner(newSquares);
    if (currentWinner) {
      setWinner(currentWinner);
      setModalIsOpen(true); 
    } else if (!newSquares.includes(null)) {
      setModalIsOpen(true);
      setWinner("Empate");
    }
  };

  const handleRestart = () => {
    setSquares(initialSquares);
    setXIsNext(true);
    setWinner(null);
    setModalIsOpen(false);
  };

  const renderSquare = (i) => {
    return (
      <Square
        value={squares[i]}
        onClickevent={() => handleClickEvent(i)}
      />
    );
  };

  const Square = (props) => {
    return (
      <button
        className={`square ${props.value === 'X' ? 'red' : 'blue'} `}
        onClick={props.onClickevent}
      >
        {props.value}
      </button>
    );
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const modalStyle = {
    content: {
      width: '800px',
      margin: 'auto',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <div>
      <div className='status'>{winner ? `Winner: ${winner}` : `Next Player: ${xIsNext ? 'X' : 'O'}`}</div>
      <div className='board-row'>
        {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
      </div>
      <div className='board-row'>
        {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
      </div>
      <div className='board-row'>
        {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Ganador Modal"
        style={modalStyle}
      >
        <button className="close-button" onClick={closeModal}>
          X
        </button>
        <h2 className='winner'>{winner ? `Felicidades, ${winner} ha ganado!` : 'Es un empate.'}</h2>
        <button onClick={handleRestart}>Reiniciar Juego</button>
      </Modal>
    </div>
  );
};

const Game = () => {
  return (
    <div className='game'>
      Gato
      <Board />
    </div>
  );
};

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  for (let line of lines) {
    const [a, b, c] = line;

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
