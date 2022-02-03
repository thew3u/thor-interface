import {Button, Grid, Typography} from '@mui/material'
import {useContract, useWeb3} from '@w3u/useweb3'
import {getDefaultProvider} from 'ethers'
import {ChangeEvent, ReactNode, useEffect, useState} from 'react'
import {NftProvider, useNft} from 'use-nft'
import ERC1155ABI from '../../abis/ERC1155.json'
import Main from '../../components/Main'
import UnstyledInput, {Block} from '../../components/style'

const exampleAddress = '0xed5af388653567af2f388e6224dc7c4b3241c544'
const exampleID = '5326'

export const NFTWrapper = () => {
  const {library, account, chainId} = useWeb3()

  const ethersConfig = {
    provider: library ?? getDefaultProvider(1)
  }

  return <NftProvider fetcher={['ethers', ethersConfig]}><NFT/></NftProvider>
}

const NFT = () => {
  const {library, account, chainId} = useWeb3()

  const [address, setAddress] = useState(exampleAddress)
  const [id, setID] = useState(exampleID)
  const {loading, error, nft} = useNft(address, id)

  return (
    <Main>
      <Block mb={4}>
        <Typography variant='subtitle1'>Contract Address</Typography>
        <UnstyledInput
          placeholder='Input contract address'
          value={address}
          onChange={(e: ChangeEvent<{value: string}>) => setAddress(e.target.value)}
        />
        <i style={{fontSize: '12px'}}>Example: {exampleAddress}</i>
        <Typography variant='subtitle1' mt={2}>
          Token ID
        </Typography>
        <UnstyledInput
          placeholder='Input token id'
          value={id}
          onChange={(e: ChangeEvent<{value: string}>) => setID(e.target.value)}
        />
        <i style={{fontSize: '12px'}}>Example: {exampleID}</i>
      </Block>
      <Grid
        container
        spacing={4}
        sx={{
          img: {
            display: 'block',
            width: '100%',
            borderRadius: '8px'
          }
        }}
      >
        <Grid item md={4}>
          <img src={nft?.image} alt={nft?.name} />
        </Grid>
        <Grid item md={8}>
          <Typography variant='h6'>{nft?.name || '#' + id}</Typography>
          <Typography variant='subtitle1'>{nft?.description}</Typography>
          <a href={nft?.metadataUrl} target='_blank'>
            Metadata Url
          </a>
        </Grid>
      </Grid>
    </Main>
  )
}

export default NFT
