import React, { memo, useContext } from 'react'
import PropTypes from 'prop-types'

import dataContext from '../contexts/data-context'

const Card = memo(({ player, winner, tie }) => {
  const { attribute } = useContext(dataContext)
  const { name, [attribute]: value } = player

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

Card.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
  }),
  tie: PropTypes.bool,
  winner: PropTypes.bool,
}

Card.defaultProps = {
  tie: false,
  winner: false,
}

export default Card
