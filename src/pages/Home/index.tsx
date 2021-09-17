import React from 'react'
import {Box, Toolbar, Typography} from '@mui/material'
import {useTranslation} from 'react-i18next'
import {drawerWidth} from '../../constants'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'

const Home = () => {
  const {t, i18n} = useTranslation()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <>
      <Box sx={{display: 'flex'}}>
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <Box component='main' sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${drawerWidth}px)`}}}>
          <Header mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
          <Toolbar />
          <Box display='flex' alignItems='center' justifyContent='center'>
            <Box width='380px' maxWidth='100%'>
              2222222
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Home
