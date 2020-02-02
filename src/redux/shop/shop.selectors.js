import { createSelector } from 'reselect'

const shopInput = (state) => state.shop

export const selectCollections = createSelector(
  [shopInput],
  (selectShop) => selectShop.collections
)

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => collections ? Object.keys(collections).map(key => collections[key]) : []
)

export const selectCollection = collectionURLParam =>
  createSelector(
  [selectCollections],
  collections => collections ? collections[collectionURLParam] : null
)

export const selectIsCollectionFetching = createSelector(
  [shopInput],
  (shop) =>  shop.isFetching
)

export const selectIsCollectionLoaded = createSelector(
  [shopInput],
  (shop) => !!shop.collections ? true : false
)
