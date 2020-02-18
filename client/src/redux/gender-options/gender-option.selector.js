import { createSelector } from 'reselect'


export const getItems = state => state.genderOptions

export const womensOptions = createSelector(
  [getItems],
  (items) => items.womensOptions
)

export const mensOptions = createSelector(
  [getItems],
  (items) => items.mensOptions
)