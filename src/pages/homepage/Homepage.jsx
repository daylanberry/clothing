import React from 'react'
import './homepage.styles.scss'
import Directory from '../../components/directory/Directory.jsx'

import { HomePageContainer } from './Homepage.styles'

const HomePage = () => (
  <HomePageContainer>
    <Directory />
  </HomePageContainer >
);

export default HomePage