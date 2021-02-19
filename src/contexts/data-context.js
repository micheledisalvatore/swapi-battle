/* eslint-disable no-loop-func */
import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react'

const dataContext = createContext({})

export default dataContext

const TYPES = ['people', 'starships']

const getRandomId = (max) => Math.round(Math.random() * 100 * max) % max + 1

export const DataProvider = ({children}) => {
  const [type, setType] = useState(TYPES[0])
  const [attribute, setAttribute] = useState('')
  const [people, setPeople] = useState([])
  const [loading, setLoading] = useState(true)
  const [starships, setStarships] = useState([])
  const [player1, setPlayer1] = useState({})
  const [player2, setPlayer2] = useState({})
  const [winner, setWinner] = useState()
  const [scores, setScores] = useState({ player1: 0, player2: 0 })

  const getData = useCallback(async (endpoint) => {
    try {
      const response = await fetch(endpoint.replace(/^http:/, ''))
      const data = await response.json()

      return data
    } catch (e) {
      console.error(e)
      return {}
    }
  }, [])

  const getPeople = useCallback(async () => {
    let data
    let endpoint = '//swapi.dev/api/people/?format=json'
    do {
      data = await getData(endpoint)

      if (data && data.results) {
        setPeople(p => [...p, ...data.results])
      }
      endpoint = data.next
    } while (endpoint)

  }, [getData, setPeople])

  const getStarships = useCallback(async () => {
    let data
    let endpoint = '//swapi.dev/api/starships/?format=json'
    do {
      data = await getData(endpoint)

      if (data && data.results) {
        setStarships(s => [...s, ...data.results])
      }
      endpoint = data.next
    } while (endpoint)

  }, [getData, setStarships])

  const getItems = useCallback(async () => {
    await getPeople()
    await getStarships()
    setLoading(false)
  }, [getPeople, getStarships])

  useEffect(() => {
    getItems()
  }, [getItems])

  const [numberOfPeople, numberOfStarships] = useMemo(() => {
    if(Object.keys(people).length && Object.keys(starships).length) {
      return [people.length, starships.length]
    }

    return [0, 0]
  }, [people, starships])

  const getPlayersIds = (type) => {
    const max = (type === TYPES[0] ? numberOfPeople : numberOfStarships) - 1
    return [getRandomId(max), getRandomId(max)]
  }

  const play = async () => {
    const [firstId, secondId] = getPlayersIds(type)

    if (type === TYPES[0]) {
      setPlayer1(people[firstId])
      setPlayer2(people[secondId])
    } else {
      setPlayer1(starships[firstId])
      setPlayer2(starships[secondId])
    }
  }

  useEffect(() => {
    const player1Attributes = Object.keys(player1)
    const player2Attributes = Object.keys(player2)
    if (player1Attributes.length && player2Attributes.length) {
      const attributes = player1Attributes.filter(attr => player2Attributes.includes(attr))
      let localAttribute = ''
      let commonAttribute = ''
      let index = 0

      do {
        localAttribute = attributes[index]
        if (typeof player1[localAttribute] === 'string' && !Number.isNaN(Number(player1[localAttribute])) && typeof player2[localAttribute] === 'string' && !Number.isNaN(Number(player2[localAttribute]))) {
          commonAttribute = localAttribute
        }
        index++
      } while(index < attributes.length && !commonAttribute)

      if (commonAttribute) {
        setAttribute(commonAttribute)
        const isPlayer1Winner = Number(player1[commonAttribute]) > Number(player2[commonAttribute])
        const isPlayer2Winner = Number(player1[commonAttribute]) < Number(player2[commonAttribute])

        setWinner(isPlayer1Winner ? 1 : (isPlayer2Winner ? 2 : 0))
        setScores((s) => ({
          ...s,
          player1: s.player1 + (isPlayer1Winner ? 1 : 0),
          player2: s.player2 + (isPlayer2Winner ? 1 : 0),
        }))
      } else {
        play()
      }
    }
  }, [player1, player2]) // eslint-disable-line

  const value = {
    play,
    player1,
    player2,
    attribute,
    TYPES,
    type,
    setType,
    winner,
    scores,
    loading,
  }

  return <dataContext.Provider value={value}>{children}</dataContext.Provider>
}
