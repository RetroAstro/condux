import {
  IncrementCounterAction,
  DecrementCounterAction,
  ClearCounterAction,
  RootState,
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

export const asyncIncrementAction = () => (dispatch: any, state: () => RootState) => {
  console.log(`async state: ${state().value.count}`)
  dispatch(incrementAction())
  setTimeout(() => {
    console.log(`async state: ${state().value.count}`)
  }, 0)
}
