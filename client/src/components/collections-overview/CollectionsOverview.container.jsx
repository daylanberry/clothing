import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'

import { selectIsCollectionFetching } from  '../../redux/shop/shop.selectors'
import CollectionsOverview from './CollectionsOverview'
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors'
import WithSpinner from '../with-spinner/WithSpinner'


const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching
})

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview)

export default CollectionsOverviewContainer