import React from 'react';
import { render } from '@testing-library/react';
import dataContext from '../../contexts/data-context'
import Card from '../card'

test('renders the winner component', () => {
  const { container } = render(<dataContext.Provider value={{ attribute: 'foo' }}><Card player={{ name: 'bar name', foo: 100 }} winner={true} /></dataContext.Provider>)

  expect(container).toMatchSnapshot()
})
