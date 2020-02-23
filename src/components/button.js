import React, { useContext } from 'react';
import dataContext from '../contexts/data-context';

const Button = () => {
  const { play } = useContext(dataContext)

  return (
    <button type="submit" onClick={play} className="btn btn-primary">
      Play
    </button>
  );
};

export default Button
