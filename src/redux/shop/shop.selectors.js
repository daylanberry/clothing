import { createSelector } from 'reselect'

const shopInput = (state) => state.shop

export const selectCollections = createSelector(
  [shopInput],
  (selectShop) => selectShop.collections
)

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => Object.keys(collections).map(key => collections[key])
)

export const selectCollection = collectionURLParam =>
  createSelector(
    [selectCollections],
    collections => collections[collectionURLParam]
  )
