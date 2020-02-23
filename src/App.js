import React, { useContext } from 'react';

import Card from './components/card'
import Button from './components/button'
import Loading from './components/loading'
import ScoreBoard from './components/score-board'
import dataContext from './contexts/data-context'

import './App.css';
import { ResourceSelector } from './components/resource-selector';

function App() {
  const { player1, player2, winner, loading } = useContext(dataContext)

  if (loading) {
    return <Loading />
  }

  return (
    <div className="container container-fluid">
      <div className="row">
        <div className="col-sm-6">
          <Card player={player1} winner={winner === 1} tie={winner === 0} />
        </div>
        <div className="col-sm-6">
          <Card player={player2} winner={winner === 2} tie={winner === 0} />
        </div>
      </div>
      <div className="row my-5">
        <div className="col-sm-12">
          <div className="d-flex justify-content-around">
            <ScoreBoard />
          </div>
        </div>
      </div>
      <div className="row my-1">
        <div className="col-sm-12">
          <div className="d-flex justify-content-center">
            <ResourceSelector />
          </div>
        </div>
      </div>
      <div className="row my-1">
        <div className="col-sm-12">
          <div className="d-flex justify-content-center">
            <Button />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
