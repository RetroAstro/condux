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
  setTimeout(() => {
    console.log(`async state: ${state().count}`)
  }, 0)
}
