import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import dataContext from '../../contexts/data-context'
import Button from '../button'

test('renders the component and clicks on it', () => {
  const play = jest.fn()
  const { container } = render(<dataContext.Provider value={{ play }}><Button /></dataContext.Provider>)

  expect(container).toMatchSnapshot()

  fireEvent.click(screen.getByText('Play'))
  expect(play).toHaveBeenCalled()
})
