import {Box, Toolbar} from '@mui/material'
import Sidebar from '../Sidebar'
import {drawerWidth} from '../../constants'
import Header from '../Header'
import Faucet from '../../pages/Faucet'
import React, {ReactNode} from 'react'
import Footer from '../Footer'

const Main = ({children}: {children: ReactNode}) => {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <Box sx={{display: 'flex'}}>
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <Box component='main' sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${drawerWidth}px)`}, maxWidth: '100%'}}>
        <Header mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <Toolbar />
        {children}
        <Footer />
      </Box>
    </Box>
  )
}

export default Main
