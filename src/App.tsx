import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {Web3Provider} from '@w3u/useweb3'
import Faucet from './pages/Faucet'
import Contract from './pages/Contract'
import Main from './components/Main'

function App() {
  return (
    <Web3Provider>
      <Switch>
        <Main>
          <Route path='/faucet'>
            <Faucet />
          </Route>
          <Route path='/contract'>
            <Contract />
          </Route>
          <Route path='/'>
            <Redirect to='/faucet' />
          </Route>
        </Main>
      </Switch>
    </Web3Provider>
  )
}

export default App
