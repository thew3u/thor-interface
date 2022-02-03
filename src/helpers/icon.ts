
export const getIcon = (name: string | undefined) => {
  switch (name) {
    case 'USDT':
      return 'https://cryptologos.cc/logos/tether-usdt-logo.svg?v=014'
    default:
      return 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=014'
  }
}

export const getMenuIcon = (name: string | undefined) => {
  switch (name) {
    case 'faucet':
      return 'https://openzeppelin.com/images/card.jpg'
    case 'nft':
      return 'https://opensea.io/static/images/logos/opensea.svg'
    default:
      return 'https://opensea.io/static/images/logos/opensea.svg'
  }
}