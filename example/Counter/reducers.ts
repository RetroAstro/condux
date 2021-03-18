import { combineReducers } from '../../src/index'

import {
  RootState,
  CounterState,
  CounterActionTypes,

  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  CLEAR_COUNTER,
} from './types'

export const rootState: RootState = {
  value: { count: 0 }
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

export const rootReducer = combineReducers({ value: counterReducer })

