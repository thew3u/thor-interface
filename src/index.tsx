import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {CssBaseline, ThemeProvider} from '@mui/material'
import {defaultTheme} from './themes/default'
import {BrowserRouter} from 'react-router-dom'
import './i18n'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
