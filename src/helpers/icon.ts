export const getIcon = (name: string) => {
  switch (name) {
    case 'USDT':
      return 'https://cryptologos.cc/logos/tether-usdt-logo.svg?v=014'
    default:
      return 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=014'
  }
}
