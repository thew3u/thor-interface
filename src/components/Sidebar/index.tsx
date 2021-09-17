import React, {useState} from 'react'
import {Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar} from '@mui/material'
import SpeedIcon from '@mui/icons-material/Speed'
import CodeIcon from '@mui/icons-material/Code'
import {drawerWidth} from '../../constants'

const Sidebar = (props: {window?: () => Window; mobileOpen: boolean; setMobileOpen: any}) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const {window, mobileOpen, setMobileOpen} = props

  const container = window !== undefined ? () => window().document.body : undefined

  const drawer = (
    <div>
      <Toolbar sx={{minHeight: '60px'}}>
        <img src='https://docs.soliditylang.org/en/v0.8.10/_static/logo.svg' alt='ethereum-logo' width={40} />
      </Toolbar>
      <List>
        <ListItemButton selected={selectedIndex === 0} key={'Faucet'} onClick={() => setSelectedIndex(0)}>
          <ListItemIcon>
            <SpeedIcon />
          </ListItemIcon>
          <ListItemText primary='Faucet' />
        </ListItemButton>
        <ListItemButton selected={selectedIndex === 1} key={'Contract'} onClick={() => setSelectedIndex(1)}>
          <ListItemIcon>
            <CodeIcon />
          </ListItemIcon>
          <ListItemText primary='Contract' />
        </ListItemButton>
      </List>
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
