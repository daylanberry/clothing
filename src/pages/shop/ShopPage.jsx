import React from 'react'
import  { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateCollections } from '../../redux/shop/shop.actions'

import CollectionsOverview from '../../components/collections-overview/CollectionsOverview'
import WithSpinner from '../../components/with-spinner/WithSpinner'

import CollectionPage from '../collection/collection.component'

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

const CollectionsOverViewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component {
  state = {
    loading: true
  }


  unsubscribeFromSnapShot = null;

  // componentDidMount() {
  //   const { updateCollections } = this.props

  //   const collectionRef = firestore.collection('collections')

  //   collectionRef.onSnapshot( async snapshot => {
  //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
  //     updateCollections(collectionsMap)
  //     this.setState({loading: false})
  //   })
  // }

  componentDidMount() {
    const { updateCollections } = this.props

    const collectionRef = firestore.collection('collections')

    collectionRef.get()
    .then(snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
      updateCollections(collectionsMap)
      this.setState({loading: false})
    })
  }

  render() {
    const { match } = this.props
    const { loading } = this.state
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} render={(props) => <CollectionsOverViewWithSpinner isLoading={loading} {...props}/>} />
        <Route path={`${match.path}/:collectionId`} render={(props) => < CollectionPageWithSpinner isLoading={loading} {...props}/>} />
      </div>
    )
  }

}

const mapDispatchToProps = dispatch => ({
  updateCollections: (collectionsMap) => dispatch(updateCollections(collectionsMap))
})


export default connect(null, mapDispatchToProps)(ShopPage);