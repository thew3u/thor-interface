import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {useWeb3, Web3Provider} from '@w3u/useweb3'
import Faucet from './pages/Faucet'
import Contract from './pages/Contract'
import Main from './components/Main'
import Helper from './pages/Helper'
import NFT from './pages/NFT'
import {NftProvider} from 'use-nft'

function App() {
  return (
    <Web3Provider>
        <Switch>
          <Main>
            <Route path='/faucet'>
              <Faucet />
            </Route>
            <Route path='/nft'>
              <NFT />
            </Route>
            <Route path='/contract'>
              <Contract />
            </Route>
            <Route path='/helper'>
              <Helper />
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
