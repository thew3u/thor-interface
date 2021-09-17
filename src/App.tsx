import React from 'react'
import {Box, Paper} from '@mui/material'
import {Redirect, Route, Switch} from 'react-router-dom'
import Home from './pages/Home'
import {Web3Provider} from '@w3u/useweb3'

function App() {
  return (
    <Web3Provider>
      <Switch>
        <Route path='/home'>
          <Home />
        </Route>
        <Route path='/'>
          <Redirect to='/home' />
        </Route>
      </Switch>
    </Web3Provider>
  )
}

export default App
