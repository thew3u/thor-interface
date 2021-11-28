import {Box, Button, InputBase, MenuItem, Select, SelectChangeEvent, styled, Typography} from '@mui/material'
import React, {ChangeEvent, useMemo, useState} from 'react'
import {useTokens} from '../../hooks'
import {displayBalance, ellipseAddress, useContract, useTokenBalances, useWeb3} from '@w3u/useweb3'
import {getIcon} from '../../helpers/icon'
import TokenABI from '../../abis/Token.json'
import {ethers} from 'ethers'

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

const Faucet = () => {
  const {library, account, chainId} = useWeb3()

  const tokens = useTokens(chainId)
  const tokenAddresses = useMemo(() => tokens.map((token) => token.address), [tokens])
  const balances = useTokenBalances(tokenAddresses, account)
  console.log(balances)

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

  return (
    <Box display='flex' alignItems='center' justifyContent='center'>
      <Box
        width='380px'
        maxWidth='100%'
        sx={{
          background: 'rgb(244, 246, 248)',
          borderRadius: '10px',
          p: 4
        }}
      >
        <Box
          sx={{
            display: 'inline-block',
            p: 1,
            borderRadius: '6px',
            background: '#fff',
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
          <Typography variant='body2' ml='auto'>
            {ellipseAddress(token?.address, 6)}
          </Typography>
        </Box>
        <Box display='flex' alignItems='center' mb={3}>
          <Typography variant='subtitle2'>Decimals</Typography>
          <Typography variant='body2' ml='auto'>
            {token?.decimals}
          </Typography>
        </Box>
        <Button fullWidth={true} onClick={mint}>
          Mint
        </Button>
      </Box>
    </Box>
  )
}

export default Faucet
