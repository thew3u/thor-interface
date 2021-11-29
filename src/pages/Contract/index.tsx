import {Box, Button, InputBase, MenuItem, Select, styled, Typography} from '@mui/material'
import React, {ChangeEvent, useEffect, useMemo, useState} from 'react'
import {useTokens} from '../../hooks'
import {
  displayBalance,
  ellipseAddress,
  MulticallCall,
  useContract,
  useMulticall,
  useTokenBalances,
  useWeb3
} from '@w3u/useweb3'
import {getIcon} from '../../helpers/icon'
import TokenABI from '../../abis/Token.json'
import {ethers} from 'ethers'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {toast} from 'react-toastify'
import Main from '../../components/Main'
import UnstyledInput from '../../components/style'
import {useDebounce} from 'react-use'
import ERC20ABI from '../../abis/ERC20.json'

const WithoutStyleInput = styled(InputBase)(({theme}) => ({
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

const Contract = () => {
  const {library, account, chainId} = useWeb3()
  const defaultAccount = account || '0xffffffffffffffffffffffffffffffffffffffff'

  // const balances = useTokenBalances(tokenAddresses, account)

  const [address, setAddress] = useState('0x1f9840a85d5af5bf1d1762f925bdaddc4201f984')

  const [debounceAddress, setDebounceAddress] = useState('')

  useDebounce(() => setDebounceAddress(address), 500, [address])
  const tokenContract = useContract(debounceAddress, ERC20ABI.abi)

  const calls: MulticallCall[] = useMemo(() => {
    if (debounceAddress !== '') {
      console.log(debounceAddress)
      return [
        {contract: tokenContract, method: 'balanceOf', args: [defaultAccount]},
        {contract: tokenContract, method: 'totalSupply', args: []},
        {contract: tokenContract, method: 'decimals', args: []},
        {contract: tokenContract, method: 'name', args: []},
        {contract: tokenContract, method: 'symbol', args: []}
      ]
    }
    return []
  }, [tokenContract])

  const result = useMulticall(calls)
  console.log(result)

  return (
    <Main>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        sx={{
          minHeight: `calc(100vh - 128px)`
        }}
      >
        <Box width='580px' maxWidth='100%'>
          <Box display='flex' alignItems='center' mb={3}>
            <UnstyledInput
              placeholder='Input contract address'
              value={address}
              onChange={(e: ChangeEvent<{value: string}>) => setAddress(e.target.value)}
            />
            <Box ml={2}>
              <Button>Confirm</Button>
            </Box>
          </Box>
          <Box
            sx={{
              background: 'rgb(244, 246, 248)',
              borderRadius: '10px',
              p: 3
            }}
          >
            {result && (
              <>
                <Box display='flex' alignItems='center' mb={1}>
                  <Typography variant='subtitle2'>Name</Typography>
                  <Typography variant='body2' ml='auto'>
                    {result[3]}
                  </Typography>
                </Box>
                <Box display='flex' alignItems='center' mb={1}>
                  <Typography variant='subtitle2'>Symbol</Typography>
                  <Typography variant='body2' ml='auto'>
                    {result[4]}
                  </Typography>
                </Box>
                <Box display='flex' alignItems='center' mb={1}>
                  <Typography variant='subtitle2'>Decimals</Typography>
                  <Typography variant='body2' ml='auto'>
                    {result[2]}
                  </Typography>
                </Box>
                <Box display='flex' alignItems='center' mb={1}>
                  <Typography variant='subtitle2'>Balance</Typography>
                  <Typography variant='body2' ml='auto'>
                    {displayBalance(result[0], result[2])}
                  </Typography>
                </Box>
                <Box display='flex' alignItems='center'>
                  <Typography variant='subtitle2'>Total Supply</Typography>
                  <Typography variant='body2' ml='auto'>
                    {displayBalance(result[1], result[2])}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Main>
  )
}

export default Contract
