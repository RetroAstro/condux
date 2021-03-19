import React, { useContext } from 'react'
import { condux, ThunkDispatch, Cache } from 'react-hooks-condux'

import {
  RootState,
  CounterActionTypes,
  rootReducer,
  rootState,
  Theme,
  themeSelector,
  decrementAction,
  asyncIncrementAction,
  themeDarkAction,
  themeLightAction,
} from './Counter/index'

export const [CounterContext, CounterProvider] = condux<RootState, CounterActionTypes | ThunkDispatch>(rootReducer, rootState)

const Decrement = () => {
  console.log('decrement')
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

const Status = () => {
  console.log('status')
  const state = useContext(CounterContext.state)
  return <>{state.value.count}</>
}

const ThemeText: React.FC<{ theme: Theme }> = ({ theme }) => {
  console.log('theme text')
  return (
    <div>{theme}</div>
  )
}

const ThemeButton: React.FC = () => {
  const state = useContext(CounterContext.state)
  const dispatch = useContext(CounterContext.dispatch)
  return (
    <button onClick={() => {
      if (state.value.theme == Theme.dark) {
        dispatch(themeLightAction())
      }
      if (state.value.theme == Theme.light) {
        dispatch(themeDarkAction())
      }
    }} type='button'>Change Theme</button>
  )
}

const Counter: React.FC = () => {
  return (
    <>
      <Decrement />
      <Status />
      <Increment />
      <Cache
        context={CounterContext.state}
        selector={themeSelector}
      >
        {value => <ThemeText theme={value} />}
      </Cache>
      <ThemeButton />
    </>
  )
}

export const App: React.FC = () => {
  return (
    <Counter />
  )
}