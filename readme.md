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
```

```ts
// Counter/types.ts
import { INCREMENT_COUNTER, DECREMENT_COUNTER, CLEAR_COUNTER } from './actionTypes'

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

export type CounterActionTypes = IncrementCounterAction | DecrementCounterAction | ClearCounterAction

export interface CounterState {
  count: number
}
```

```ts
// Counter/actions.ts
import {
  IncrementCounterAction,
  DecrementCounterAction,
  ClearCounterAction,
  CounterState,
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  CLEAR_COUNTER,
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

export const asyncIncrementAction = () => (dispatch: any, state: () => CounterState) => {
  console.log(`async state: ${state().count}`)
  dispatch(incrementAction())
  setTimeout(() => console.log(`async state: ${state().count}`), 0)
}
```

```ts
// Counter/reducers.ts
import {
  CounterState,
  CounterActionTypes,

  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  CLEAR_COUNTER,
} from './types'

export const counterState: CounterState = {
  count: 0
}

export const counterReducer = (state: CounterState, action: CounterActionTypes) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return { ...state, count: state.count + 1 }
    case DECREMENT_COUNTER:
      return { ...state, count: state.count - 1 }
    case CLEAR_COUNTER:
      return { count: 0 }
    default:
      return { ...state }
  }
}
```

```ts
// Counter/index.ts
export * from './types'
export * from './reducers'
export * from './actions'
```

```tsx
// App.tsx
import { condux, ThunkDispatch } from 'react-hooks-condux'

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
```

```tsx
// index.tsx
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
