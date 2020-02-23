import React, { useContext } from 'react';
import { render, screen, fireEvent, waitForDomChange, waitForElementToBeRemoved } from '@testing-library/react';
import dataContext, { DataProvider } from '../data-context'
import fetchMock from 'jest-fetch-mock'
import { mockRandom, resetMockRandom } from 'jest-mock-random'

fetchMock.enableMocks()
beforeAll(() => {
  fetch.resetMocks()
  fetch.mockResponseOnce(JSON.stringify({
    count: 8,
    next: 'https://swapi.co/api/people/?page=2&format=json',
    results: [{
      name: 'Foo person 1',
      foo: '1',
    },{
      name: 'Foo person 2',
      foo: '2',
    },{
      name: 'Foo player 3',
      bar: '3',
    },{
      name: 'Foo player 4',
      xyz: '4',
    }],
  })).mockResponseOnce(JSON.stringify({
    count: 8,
    next: null,
    results: [{
      name: 'Foo person 5',
      foo: '5',
    },{
      name: 'Foo person 6',
      foo: '6',
    },{
      name: 'Foo player 7',
      bar: '7',
    },{
      name: 'Foo player 8',
      zyx: '8',
    }],
  })).mockResponseOnce(JSON.stringify({
    count: 3,
    next: null,
    results: [{
      name: 'Bar person 1',
      bar: '1',
    },{
      name: 'Bar person 2',
      bar: '2',
    },{
      name: 'Bar player 3',
      xyz: '3',
    }],
  }))
  mockRandom([0.234, 0.456])
})

afterAll(() => {
  resetMockRandom()
})

const Presenter = () => {
  const {
    play,
    player1,
    player2,
    attribute,
    type,
    setType,
    winner,
    scores: {
      player1: player1Score,
      player2: player2Score,
    },
    loading,
  } = useContext(dataContext)

  return (
    <>
      {loading && <div data-testid="loading" />}
      {!loading && (
        <>
          <div data-testid="attribute">{attribute}</div>
          <div data-testid="type">{type}</div>
          <div data-testid="winner">{winner}</div>
          <div data-testid="player1Score">{player1Score}</div>
          <div data-testid="player1-attribute">{player1[attribute]}</div>
          <div data-testid="player1-name">{player1.name}</div>
          <div data-testid="player2Score">{player2Score}</div>
          <div data-testid="player2-attribute">{player2[attribute]}</div>
          <div data-testid="player2-name">{player2.name}</div>
          <button type="button" onClick={() => setType('people')} data-testid="set-type-people" />
          <button type="button" onClick={() => setType('starships')} data-testid="set-type-starships" />
          <button type="button" onClick={play} data-testid="play" />
        </>
      )}
    </>
  )
}

test('renders the component and clicks on it', async () => {
  const { container } = render(<DataProvider><Presenter /></DataProvider>)

  expect(container).toMatchSnapshot()

  await waitForDomChange()

  expect(container).toMatchSnapshot()
  expect(screen.queryByTestId('player1Score')).toContainHTML(0)
  expect(screen.queryByTestId('player2Score')).toContainHTML(0)
  expect(screen.queryByTestId('type')).toContainHTML('people')

  fireEvent.click(screen.queryByTestId('set-type-starships'))
  expect(screen.queryByTestId('type')).toContainHTML('starships')

  fireEvent.click(screen.queryByTestId('set-type-people'))
  expect(screen.queryByTestId('type')).toContainHTML('people')

  fireEvent.click(screen.queryByTestId('play'))
  expect(container).toMatchSnapshot()
  expect(screen.queryByTestId('attribute')).toContainHTML('foo')
  expect(screen.queryByTestId('player1-attribute')).toContainHTML(5)
  expect(screen.queryByTestId('player1Score')).toContainHTML(0)
  expect(screen.queryByTestId('player2-attribute')).toContainHTML(6)
  expect(screen.queryByTestId('player2Score')).toContainHTML(1)
})
