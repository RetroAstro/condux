import { combineReducers } from '../../src/index'

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

