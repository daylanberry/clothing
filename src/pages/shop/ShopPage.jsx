import React from 'react'
import  { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectIsCollectionFetching, selectIsCollectionLoaded } from '../../redux/shop/shop.selectors'
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions'

import CollectionsOverviewContainer from '../../components/collections-overview/CollectionsOverview.container'
import WithSpinner from '../../components/with-spinner/WithSpinner'

import CollectionPageContainer from '../collection/CollectionPage.container'

// import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

class ShopPage extends React.Component {

  componentDidMount(){
    const { fetchCollectionsStartAsync } = this.props

    fetchCollectionsStartAsync()
  }

  render() {
    const { match } = this.props

    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} components={CollectionsOverviewContainer}/>

        <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
      </div>
    )
  }

}


const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})


export default connect(null, mapDispatchToProps)(ShopPage);