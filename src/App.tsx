import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {Web3Provider} from '@w3u/useweb3'
import Faucet from './pages/Faucet'
import Contract from './pages/Contract'

function App() {
  return (
    <Web3Provider>
      <Switch>
        <Route path='/faucet'>
          <Faucet />
        </Route>
        <Route path='/contract'>
          <Contract />
        </Route>
        <Route path='/'>
          <Redirect to='/faucet' />
        </Route>
      </Switch>
    </Web3Provider>
  )
}

export default App
