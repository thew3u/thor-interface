import {AppBar, Box, Button, IconButton, Toolbar} from '@mui/material'
import {Menu} from '@mui/icons-material'
import React from 'react'
import {drawerWidth} from '../../constants'
import {useTranslation} from 'react-i18next'
import {ellipseAddress, getInjectedConnector, useWeb3} from '@w3u/useweb3'

export const injectedConnector = getInjectedConnector()

const Header = ({mobileOpen, setMobileOpen}: {mobileOpen: boolean; setMobileOpen: any}) => {
  const {t} = useTranslation()
  const {account, activate} = useWeb3()

  return (
    <>
      <AppBar
        color='transparent'
        position='fixed'
        sx={{
          width: {sm: `calc(100% - ${drawerWidth}px)`},
          ml: {sm: `${drawerWidth}px`}
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            backdropFilter: 'blur(8px)',
            background: 'rgba(255, 255, 255, .8)'
          }}
        >
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{mr: 2, display: {sm: 'none'}}}
          >
            <Menu />
          </IconButton>
          <Box ml='auto'>
            {account ? (
              <>{ellipseAddress(account)}</>
            ) : (
              <Button variant='outlined' onClick={() => activate(injectedConnector, (e) => console.error(e), true)}>
                {t('unlock_wallet')}
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header
