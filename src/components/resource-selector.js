import React, { useContext } from 'react';
import dataContext from '../contexts/data-context';

export const ResourceSelector = () => {
  const { TYPES, type, setType } = useContext(dataContext)

  return (
    <div className="btn-group btn-group-toggle" data-toggle="buttons">
      <label className={`btn btn-secondary ${ type === TYPES[0] && 'active'}`} htmlFor={TYPES[0]}>
        <input type="radio" name="options" id={TYPES[0]} autoComplete="off" checked={type === TYPES[0]} onChange={() => setType(TYPES[0])} value={TYPES[0]} /> {TYPES[0]}
      </label>
      <label className={`btn btn-secondary ${ type === TYPES[1] && 'active'}`} htmlFor={TYPES[1]}>
        <input type="radio" name="options" id={TYPES[1]} autoComplete="off" checked={type === TYPES[1]} onChange={() => setType(TYPES[1])} value={TYPES[1]} /> {TYPES[1]}
      </label>
    </div>
  );
};
