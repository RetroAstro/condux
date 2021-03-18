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

export interface RootState {
  value: CounterState
}