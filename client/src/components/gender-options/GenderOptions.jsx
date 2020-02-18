import React from 'react'
import './GenderOptions.scss'
import { withRouter } from 'react-router-dom'

const GenderOptions = ({ title, imageUrl, match, history}) => {

  return (
    <div className='menu-item' onClick={() => history.push(`${match.path}/${title}`)}>

      <div className='background-image' style={{
        backgroundImage: `url(${imageUrl})`
      }} />

      <div className='content'>
        <h1 className='title'>{title}</h1>
        <span className='subtitle'>check it out</span>
      </div>

    </div>
  )
}

export default withRouter(GenderOptions)