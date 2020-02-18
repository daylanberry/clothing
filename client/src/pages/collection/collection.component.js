import React from 'react'

import { Link } from 'react-router-dom'

import CollectionItem from '../../components/CollectionItem/CollectionItem'
import { connect } from 'react-redux'
import { selectCollection } from '../../redux/shop/shop.selectors'

import './collection.scss'

const CollectionPage = ( { collection, ownProps, match } ) => {

  const { title, items } = collection
  const gender = match.path.includes('womens') ? 'womens' : 'mens'
  const filteredItems = match.path.includes('womens') ? items.filter(item => item.gender === 'womens') : items.filter(item => item.gender === 'mens')

    return (
      <div className='collection-page'>
        <div className='title-header'>
        <h2 className='title'>{title}</h2>
          <Link className='link' to={`/shop/${gender}`} >go back to selections</Link>
        </div>
        <div className='items'>
          {
            filteredItems.map(item =>
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

