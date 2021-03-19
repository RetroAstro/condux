import { RootState, Theme } from './types'

export const themeSelector = (state: RootState): Theme => {
  return state.value.theme
}
