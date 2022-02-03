import {Box, Toolbar} from '@mui/material'
import Sidebar from '../Sidebar'
import {drawerWidth} from '../../constants'
import Header from '../Header'
import React, {ReactNode} from 'react'
import Footer from '../Footer'
import {useWeb3} from '@w3u/useweb3'
import {NftProvider} from 'use-nft'
import {getDefaultProvider} from 'ethers'

const Main = ({children}: {children: ReactNode}) => {
  const {library} = useWeb3()

  const ethersConfig = {
    provider: library ?? getDefaultProvider(1)
  }

  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <NftProvider fetcher={['ethers', ethersConfig]}>
      <Box sx={{display: 'flex'}}>
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <Box component='main' sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${drawerWidth}px)`}, maxWidth: '100%'}}>
          <Header mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
          <Toolbar />
          <Box sx={{
            minHeight: 'calc(100vh - 140px)'
          }}>
            {children}
          </Box>
          <Footer />
        </Box>
      </Box>
    </NftProvider>
  )
}

export default Main
