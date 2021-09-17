module.exports = {
  root: true,
  plugins: ['@typescript-eslint'],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    'comma-dangle': 2,
    '@typescript-eslint/member-delimiter-style': [
      2,
      {
        multiline: {
          delimiter: 'semi',
          requireLast: false
        },
        singleline: {
          delimiter: 'semi',
          requireLast: true
        }
      }
    ]
  }
}
