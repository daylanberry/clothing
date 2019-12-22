import React from 'react';
import {Switch, Route, Link} from 'react-router-dom'
import './App.css';
import HomePage from './pages/homepage/Homepage.jsx'


const HatsPage = (props) => (
  <div>
    <h1>{`hats`}</h1>
    <button onClick={() => props.history.push('/test')}>click</button>
    <Link to='/test'>or this</Link>
  </div>
)


function App() {
  return (
    <div >
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/hats' component={HatsPage} />
      </Switch>
    </div>
  );
}

export default App;
