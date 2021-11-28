import {useMemo} from 'react'
import {TOKENS} from '../constants/token'

export const useTokens = (chainID: number | undefined) =>
  useMemo(() => TOKENS.filter((token) => token.chainID === chainID), [chainID])
