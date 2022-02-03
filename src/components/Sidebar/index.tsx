import React, {useEffect, useState} from 'react'
import {Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography} from '@mui/material'
import {drawerWidth} from '../../constants'
// @ts-ignore
import Jazzicon, {jsNumberForAddress} from 'react-jazzicon'
import {CHAIN_ETHER, Chains} from '@w3u/chains'
import {ellipseAddress, useWeb3} from '@w3u/useweb3'
import {Link, NavLink, Route, Switch} from 'react-router-dom'
import HardwareIcon from '@mui/icons-material/Hardware'
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { getMenuIcon } from '../../helpers/icon'
import Avatar from '@mui/material/Avatar';

const menus = [
  {
    link: 'faucet',
    name: 'Faucet'
  },
  {
    link: 'nft',
    name: 'NFT'
  },
  {
    link: 'contract',
    name: 'Contract'
  },
  {
    link: 'helper',
    name: 'Helper'
  }
]

const Sidebar = (props: {window?: () => Window; mobileOpen: boolean; setMobileOpen: any}) => {
  const {chainId, account} = useWeb3()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const {window, mobileOpen, setMobileOpen} = props

  const container = window !== undefined ? () => window().document.body : undefined

  const drawer = (
    <div>
      <Toolbar sx={{minHeight: '60px'}}>
        <img src='https://docs.soliditylang.org/en/v0.8.10/_static/logo.svg' alt='ethereum-logo' width={40} />
      </Toolbar>
      <Box
        sx={{
          p: 3
        }}
      >
        <Box
          sx={{
            p: '15px 20px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            background: 'rgb(244, 246, 248)'
          }}
        >
          <Jazzicon diameter={38} seed={jsNumberForAddress(account || '')} />
          <Box ml={2}>
            <Typography variant='subtitle2'>{Chains[chainId || CHAIN_ETHER].displayName}</Typography>
            <Typography variant='body2'>{ellipseAddress(account)}</Typography>
          </Box>
        </Box>
      </Box>
      <Box
        p={3}
        sx={{
          '.MuiTypography-root': {
            fontSize: '14px'
          }
        }}
      >
        <List>
          {
            menus.map((menu, i) =>
              <ListItemButton
                component={Link}
                to={`/${menu.link}`}
                selected={selectedIndex === i}
                key={menu.link}
                onClick={() => setSelectedIndex(i)}
              >
                <ListItemIcon>
                  <img src={getMenuIcon(menu.link)} alt='icon' width={24} height={24} />
                </ListItemIcon>
                <ListItemText primary={menu.name} />
              </ListItemButton>
            )
          }
        </List>
      </Box>
    </div>
  )

  return (
    <>
      <Box component='nav' sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}} aria-label='mailbox folders'>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={() => setMobileOpen(!mobileOpen)}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: {xs: 'block', sm: 'none'},
            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth}
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: {xs: 'none', sm: 'block'},
            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth}
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  )
}

export default Sidebar
