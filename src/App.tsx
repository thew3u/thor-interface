import React from 'react'
import {HashRouter, Route, Routes} from 'react-router-dom'
import {Web3Provider} from '@w3u/useweb3'
import Faucet from './pages/Faucet'
import Contract from './pages/Contract'
import Helper from './pages/Helper'
import {NFTWrapper} from './pages/NFT'

function App() {
  return (
    <Web3Provider>
        <Routes>
          <Route path='/faucet' element={<Faucet />} />
          <Route path='/nft' element={<NFTWrapper />} />
          <Route path='/contract' element={<Contract />} />
          <Route path='/helper' element={<Helper />} />
          <Route path='/' element={<Faucet />} />
        </Routes>
    </Web3Provider>
  )
}

export default App
