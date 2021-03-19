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
