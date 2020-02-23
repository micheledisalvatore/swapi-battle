import React, { useContext } from 'react';
import dataContext from '../contexts/data-context';

const ScoreBoard = () => {
  const { scores: { player1, player2 } } = useContext(dataContext)

  return (
    <div className="card">
      <h5 className="card-header">Score board</h5>
      <div className="card-body">
        <button type="button" className="btn btn-primary my-2">
          Player 1 <span className="badge badge-light">{player1}</span>
        </button>
        <br />
        <button type="button" className="btn btn-primary my-2">
          Player 2 <span className="badge badge-light">{player2}</span>
        </button>
      </div>
    </div>
  );
};

export default ScoreBoard
