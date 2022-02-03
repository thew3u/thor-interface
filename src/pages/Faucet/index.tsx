import {Box, Button, InputBase, MenuItem, Select, styled, Typography} from '@mui/material'
import React, {useMemo, useState} from 'react'
import {useTokens} from '../../hooks'
import {displayBalance, ellipseAddress, useContract, useTokenBalances, useWeb3} from '@w3u/useweb3'
import {getIcon} from '../../helpers/icon'
import TokenABI from '../../abis/Token.json'
import {ethers} from 'ethers'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {toast} from 'react-toastify'
import Main from '../../components/Main'
import {CHAIN_ETHER_KOVAN} from '@w3u/chains'
import NotFound from '../../assets/images/404.svg'
import {Block} from '../../components/style'

export const WithoutStyleInput = styled(InputBase)(({theme}) => ({
  root: {
    borderRadius: '6px',
    color: '#333A50',
    fontSize: '14px !important',
    '& .MuiSelect-selectMenu': {
      display: 'flex',
      alignItems: 'center',
      '&:focus': {
        background: 'none'
      },
      '& img': {
        margin: '0 5px 0 0'
      },
      '& p': {
        // display: 'none',
      }
    }
  }
}))

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @param tokenImage
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (
  tokenAddress: string,
  tokenSymbol: string,
  tokenDecimals: number,
  tokenImage: string
) => {
  const provider = window.ethereum

  if (provider) {
    try {
      // @ts-ignore
      const tokenAdded = await provider.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage
          }
        }
      })
      return tokenAdded
    } catch (e) {
      console.error(e)
    }
  }
}

const Faucet = () => {
  const {library, account, chainId} = useWeb3()

  const tokens = useTokens(chainId)
  const tokenAddresses = useMemo(() => tokens.map((token) => token.address), [tokens])
  const balances = useTokenBalances(tokenAddresses, account)

  const [selected, setSelected] = useState((tokens && tokens.length > 0 && tokens[0].address) || '')
  const token = useMemo(() => tokens.find((token) => token.address === selected), [tokens, selected])
  const index = useMemo(() => tokens.findIndex((token) => token.address === selected), [tokens, selected])
  const tokenContract = useContract(token?.address, TokenABI.abi)

  const handleChange = (event: {target: {value: string}}) => setSelected(event.target.value)

  const mint = async () => {
    try {
      const tx = await tokenContract?.mint(account, ethers.utils.parseUnits('10000', token?.decimals))
      await tx.wait()
    } catch (e) {
      console.error(e)
    }
  }

  if (chainId !== CHAIN_ETHER_KOVAN) {
    return (
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        sx={{
          minHeight: `calc(100vh - 148px)`
        }}
      >
        <Box textAlign='center'>
          <img src={NotFound} alt='not-found' width={200} />
          <Typography variant='body2' mt={2}>
            Only support Kovan and BSC Testnet
          </Typography>
        </Box>
      </Box>
    )
  }

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      sx={{
        minHeight: `calc(100vh - 128px)`
      }}
    >
      <Block width='380px' maxWidth='100%'>
        <Box
          sx={{
            display: 'inline-block',
            p: 1,
            borderRadius: '6px',
            background: '#',
            borderColor: 'primary.main',
            mb: 3
          }}
        >
          <Select
            MenuProps={{anchorOrigin: {vertical: 'bottom', horizontal: 'center'}}}
            value={selected}
            onChange={handleChange}
            input={<WithoutStyleInput />}
          >
            {tokens?.map((token) => {
              return (
                <MenuItem value={token.address} key={token.symbol}>
                  <Box display='flex' alignItems='center'>
                    <img width={16} height={16} src={getIcon(token.symbol)} alt='token' />
                    <Typography variant={'body2'} ml={1}>
                      {token.symbol}
                    </Typography>
                  </Box>
                </MenuItem>
              )
            })}
          </Select>
        </Box>
        <Box display='flex' alignItems='center'>
          <Typography variant='subtitle2'>Balance</Typography>
          <Typography variant='body2' ml='auto'>
            {displayBalance(balances && balances[index], token?.decimals)}
          </Typography>
        </Box>
        <Box display='flex' alignItems='center'>
          <Typography variant='subtitle2'>Address</Typography>
          <Typography variant='body2' ml='auto' sx={{svg: {fontSize: '12px', cursor: 'pointer'}}}>
            {ellipseAddress(token?.address, 6)} &nbsp;
            <CopyToClipboard
              text={token?.address || ''}
              onCopy={() => {
                toast('🦄 Copy successfully', {
                  position: 'top-right',
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined
                })
              }}
            >
              <ContentCopyIcon />
            </CopyToClipboard>
          </Typography>
        </Box>
        <Box display='flex' alignItems='center'>
          <Typography variant='subtitle2'>Decimals</Typography>
          <Typography variant='body2' ml='auto'>
            {token?.decimals}
          </Typography>
        </Box>
        <Box textAlign='right' my={2}>
          <Typography
            style={{cursor: 'pointer', color: '#1164FB'}}
            variant='caption'
            onClick={() =>
              registerToken(token?.address || '', token?.symbol || '', token?.decimals || 18, getIcon(token?.symbol))
            }
          >
            Add {token?.symbol} to Metamask
          </Typography>
        </Box>
        <Button fullWidth={true} onClick={mint}>
          Mint
        </Button>
      </Block>
    </Box>
  )
}

export default Faucet
