import React, { memo, useContext } from 'react'
import dataContext from '../contexts/dataContext'

const Card = memo(({ player, winner, tie }) => {
  const { attribute } = useContext(dataContext)
  const { name, [attribute]: value } = player
  console.log('player', player)
  console.log('attribute', attribute)
  return (
    <div className={`card ${winner && `text-white bg-success`} ${tie && `bg-light`}`}>
      <h5 className="card-header">{name}</h5>
      <div className="card-body">
        {!!attribute && (
          <button type="button" className="btn btn-primary">
            {attribute} <span className="badge badge-light">{value}</span>
          </button>
        )}
      </div>
    </div>
  )
})

export default Card
