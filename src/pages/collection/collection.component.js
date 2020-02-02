import React from 'react'

import CollectionItem from '../../components/CollectionItem/CollectionItem'
import { connect } from 'react-redux'
import { selectCollection } from '../../redux/shop/shop.selectors'

import './collection.scss'

const CollectionPage = ( { collection, ownProps } ) => {

  const { title, items } = collection

  return (
    <div className='collection-page'>
      <h2 className='title'>{title}</h2>
      <div className='items'>
        {
          items.map(item =>
            <CollectionItem key={item.id} item={item}/>
            )
        }
      </div>
    </div>
  )
}



const mapStateToProps = (state, ownProps) =>({
  ownProps,
  collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps, null)(CollectionPage)

