# Condux
> State with hooks, simple but exquisite.

## Installation

```
npm i react-hooks-condux -S
```

## Example

```ts
// Counter/actionTypes.ts
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER'
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER'
export const CLEAR_COUNTER = 'CLEAR_COUNTER'
export const THEME_DARK = 'THEME_DARK'
export const THEME_LIGHT = 'THEME_LIGHT'
```

```ts
// Counter/types.ts
import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  CLEAR_COUNTER,
  THEME_DARK,
  THEME_LIGHT,
} from './actionTypes'

export * from './actionTypes'

export interface IncrementCounterAction {
  type: typeof INCREMENT_COUNTER
}

export interface DecrementCounterAction {
  type: typeof DECREMENT_COUNTER
}

export interface ClearCounterAction {
  type: typeof CLEAR_COUNTER
}

export interface ThemeDarkAction {
  type: typeof THEME_DARK
}

export interface ThemeLightAction {
  type: typeof THEME_LIGHT
}

export enum Theme {
  dark = 'dark',
  light = 'light'
}

export interface CounterState {
  count: number
  theme: Theme
}

export interface RootState {
  value: CounterState
}

export type CounterActionTypes =
  IncrementCounterAction | DecrementCounterAction | ClearCounterAction | ThemeDarkAction | ThemeLightAction

```

```ts
// Counter/actions.ts
import {
  IncrementCounterAction,
  DecrementCounterAction,
  ClearCounterAction,
  ThemeDarkAction,
  ThemeLightAction,
  RootState,
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  CLEAR_COUNTER,
  THEME_DARK,
  THEME_LIGHT,
} from './types'

export const incrementAction = (): IncrementCounterAction => {
  return {
    type: INCREMENT_COUNTER
  }
}

export const decrementAction = (): DecrementCounterAction => {
  return {
    type: DECREMENT_COUNTER
  }
}

export const clearAction = (): ClearCounterAction => {
  return {
    type: CLEAR_COUNTER
  }
}

export const asyncIncrementAction = () => (dispatch: any, state: () => RootState) => {
  console.log(`async state: ${state().value.count}`)
  dispatch(incrementAction())
  setTimeout(() => {
    console.log(`async state: ${state().value.count}`)
  }, 0)
}

export const themeDarkAction = (): ThemeDarkAction => {
  return {
    type: THEME_DARK
  }
}

export const themeLightAction = (): ThemeLightAction => {
  return {
    type: THEME_LIGHT
  }
}
```

```ts
// Counter/reducers.ts
import { combineReducers } from 'react-hooks-condux'

import {
  RootState,
  CounterState,
  CounterActionTypes,

  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  CLEAR_COUNTER,
  THEME_DARK,
  THEME_LIGHT,
  Theme,
} from './types'

export const rootState: RootState = {
  value: { count: 0, theme: Theme.dark }
}

export const counterReducer = (state: CounterState, action: CounterActionTypes) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return { ...state, count: state.count + 1 }
    case DECREMENT_COUNTER:
      return { ...state, count: state.count - 1 }
    case CLEAR_COUNTER:
      return { ...state, count: 0 }
    case THEME_DARK:
      return { ...state, theme: Theme.dark }
    case THEME_LIGHT:
      return { ...state, theme: Theme.light }
    default:
      return { ...state }
  }
}

export const rootReducer = combineReducers({ value: counterReducer })
```

```ts
// Counter/selectors.ts
import { RootState, Theme } from './types'

export const themeSelector = (state: RootState): Theme => {
  return state.value.theme
}
```

```ts
// Counter/index.ts
export * from './types'
export * from './reducers'
export * from './actions'
export * from './selectors'
```

```tsx
// App.tsx
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
    <text>{theme}</text>
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
```

```tsx
// index.tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { MultiProvider } from 'react-hooks-condux'
import { App, CounterProvider } from './App'

ReactDOM.render(
  <MultiProvider
    providers={[
      <CounterProvider />
    ]}
  >
    <App />
  </MultiProvider>,
  document.getElementById('root')
)
```

**Note :**

Since our state and dispatch are separated, we can easily get the performance optimization.

## License

MIT © [RetroAstro](https://github.com/RetroAstro)
