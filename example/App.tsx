import React, { useContext } from 'react'
import { condux, ThunkDispatch } from '../src/index'

import {
  CounterState,
  CounterActionTypes,
  counterReducer,
  counterState,
  decrementAction,
  asyncIncrementAction
} from './Counter/index'

export const [CounterContext, CounterProvider] = condux<CounterState, CounterActionTypes | ThunkDispatch>(counterReducer, counterState)

const Counter: React.FC = () => {
  const Status = () => {
    const state = useContext(CounterContext.state)
    return (
      <span>{state.count}</span>
    )
  }

  const Decrement = () => {
    const dispatch = useContext(CounterContext.dispatch)
    return (
      <button onClick={() => dispatch(decrementAction())} type='button'>-</button>
    )
  }

  const Increment = () => {
    console.log('increment')
    const dispatch = useContext(CounterContext.dispatch)
    return (
      <button onClick={() => dispatch(asyncIncrementAction())} type='button'>+</button>
    )
  }

  return (
    <>
      <Decrement />
      <Status />
      <Increment />
    </>
  )
}

export const App: React.FC = () => {
  return (
    <Counter />
  )
}