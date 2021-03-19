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
