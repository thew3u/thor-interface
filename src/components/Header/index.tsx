import {AppBar, Box, Button, IconButton, MenuItem, Select, Toolbar} from '@mui/material'
import {Menu} from '@mui/icons-material'
import React, {useState} from 'react'
import {drawerWidth} from '../../constants'
import {useTranslation} from 'react-i18next'
import {ellipseAddress, getInjectedConnector, useWeb3} from '@w3u/useweb3'
import {CHAIN_BSC, CHAIN_ETHER, CHAIN_ETHER_KOVAN, Chains} from '@w3u/chains'
import {WithoutStyleInput} from '../../pages/Faucet'

export const injectedConnector = getInjectedConnector()

/**
 * Prompt the user to add a network to the Metamask, and if the wallet is on a different network, switch to the corresponding network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async (chainID: number): Promise<boolean> => {
  // const provider = createMetaMaskProvider()
  const provider = window.ethereum

  console.log(chainID)
  if (provider) {
    try {
      if (chainID === CHAIN_ETHER || chainID === CHAIN_ETHER_KOVAN) {
        // @ts-ignore
        await provider.request({method: 'wallet_switchEthereumChain', params: [{chainId: `0x${chainID.toString(16)}`}]})
      } else {
        // @ts-ignore
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${chainID.toString(16)}`,
              chainName: Chains[chainID].name,
              nativeCurrency: {
                name: Chains[chainID].symbol,
                symbol: Chains[chainID].symbol,
                decimals: Chains[chainID].decimals
              },
              rpcUrls: [Chains[chainID].rpc],
              blockExplorerUrls: [Chains[chainID].explorer]
            }
          ]
        })
      }
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  } else {
    console.error("Can't setup the BSC network on metamask because window.ethereum is undefined")
    return false
  }
}

const Header = ({mobileOpen, setMobileOpen}: {mobileOpen: boolean; setMobileOpen: any}) => {
  const {t} = useTranslation()
  const {chainId, account, activate} = useWeb3()

  const [chainID, setChainID] = useState(chainId ?? CHAIN_ETHER)

  const change = (e: {target: {value: string}}) => {
    setupNetwork(Number(e.target.value))
      .then(() => {
        setChainID(Number(e.target.value))
        window.location.reload()
      })
      .catch((e) => console.error('Setup network: ', e))
  }

  const chains = [CHAIN_ETHER, CHAIN_BSC, CHAIN_ETHER_KOVAN]

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
            <Box
              sx={{
                display: 'inline-block',
                p: '2px 10px',
                borderRadius: '6px',
                background: 'rgb(244, 246, 248)',
                borderColor: 'primary.main'
              }}
            >
              <Select
                MenuProps={{anchorOrigin: {vertical: 'bottom', horizontal: 'center'}}}
                value={String(chainID)}
                onChange={change}
                input={<WithoutStyleInput />}
              >
                {chains.map((chain) => (
                  <MenuItem key={chain} value={chain}>
                    <Box
                      display='flex'
                      alignItems='center'
                      sx={{
                        img: {
                          mr: 1
                        }
                      }}
                    >
                      <img src={Chains[chain].icon} width={16} alt='chain' />
                      {Chains[chain].displayName}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </Box>
            {!account && (
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
