import React from 'react'
import { withRouter } from 'react-router-dom'

import './MenuItem.scss'

const MenuItem = ({title, imageUrl, size, history, linkUrl, match}) => (

  <div className={`${size} menu-item`} onClick={() => history.push(match.url + linkUrl)}>
    <div
    className='background-image'
    style={{
      backgroundImage: `url(${imageUrl})`
    }}
    />
    <div className='content'>
      <div className='title'>{title.toUpperCase()}</div>
      <span className='subtitle'>SHOP NOW</span>
    </div>
  </div>
)

//returns modified component with access to location/match/history props
export default withRouter(MenuItem);
