import {Box, Grid, Typography} from '@mui/material'
import UnstyledInput, {Block} from '../../components/style'
import React, {ChangeEvent, useEffect, useState} from 'react'
import {useContract} from '@w3u/useweb3'
import {HELPER_CONTRACT_ADDRESS} from '../../constants/contract'
import HelperABI from '../../abis/Helper.json'
import {useDebounce} from 'use-debounce'
import {ethers} from 'ethers'

const Helper = () => {
  const [content, setContent] = useState('')
  const [result, setResult] = useState('')

  const [debounceContent] = useDebounce(content, 500)

  const helperContract = useContract(HELPER_CONTRACT_ADDRESS, HelperABI.abi)

  useEffect(() => {
    const query = async () => {
      const r = await helperContract?.stringToBytes32(debounceContent)
      setResult(r)
    }

    query().catch((e) => console.error(e))
  }, [debounceContent])

  useEffect(() => {
    const action = async () => {
      const iface = new ethers.utils.Interface([{
      "inputs": [
        {
          "internalType": "address",
          "name": "token0",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "chainID",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "crossOut",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }])

      const result = iface.decodeFunctionData("crossOut", "0xdf7e600a0000000000000000000000005de1677344d3cb0d7d465c10b72a8f60699c062d00000000000000000000000000000000000000000000000000000000000000380000000000000000000000004fa3f9da0551393d11d27eaf5b1f2083d95e0c1300000000000000000000000000000000000000000000000000000000c82ecbb0")
      console.log(result)
      const r = Object.keys(result)
      for (let i = 0; i < r.length; i++) {
        console.log(`${r[i]}: ${result[r[i]].toString()}`)
      }
    }
    action().catch(e => console.error(e))
  }, [])

  return (
    <Box
      sx={{
        minHeight: `calc(100vh - 148px)`
      }}
    >
      <Grid container>
        <Grid item md={6} xs={12}>
          <Block>
            <Typography variant='h6' mb={2}>
              String to Bytes
            </Typography>
            <UnstyledInput
              placeholder='Input String'
              value={content}
              onChange={(e: ChangeEvent<{value: string}>) => setContent(e.target.value)}
            />
            <Typography variant='body2' mt={2}>
              {result}
            </Typography>
          </Block>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Helper
