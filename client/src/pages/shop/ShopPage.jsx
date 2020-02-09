import React, { useEffect, lazy, Suspense } from 'react'
import  { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { fetchCollectionsStart } from '../../redux/shop/shop.actions'

import CollectionsOverviewContainer from '../../components/collections-overview/CollectionsOverview.container'

import WithSpinner from '../../components/with-spinner/WithSpinner'

import CollectionPageContainer from '../collection/CollectionPage.container'

// const CollectionsOverviewContainer = lazy(() => import('../../components/collections-overview/CollectionsOverview.container'))

// const CollectionPageContainer = lazy(() => import('../collection/CollectionPage.container'))

// import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

const ShopPage = ({fetchCollectionsStart, match}) => {

  useEffect(() => {
    fetchCollectionsStart()
  }, [fetchCollectionsStart])


    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionsOverviewContainer}/>

        <Route exact path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
      </div>
    )

}


const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})


export default connect(null, mapDispatchToProps)(ShopPage);