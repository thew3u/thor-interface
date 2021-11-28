import {Token} from '../models/token'
import {CHAIN_ETHER_KOVAN} from '@w3u/chains'

export const TOKENS: Token[] = [
  {
    symbol: 'USDT',
    decimals: 6,
    address: '0x1265ab625020463E293A822bc4f6d4fd1E7213C2',
    chainID: CHAIN_ETHER_KOVAN
  },
  {
    symbol: 'FTA',
    decimals: 18,
    address: '0xE400000c944368AdCeF19BE27a9E0f54B395a437',
    chainID: CHAIN_ETHER_KOVAN
  }
]
