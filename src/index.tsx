import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {CssBaseline, ThemeProvider} from '@mui/material'
import {defaultTheme} from './themes/default'
import {BrowserRouter} from 'react-router-dom'
import './i18n'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <CssBaseline />
        <App />
        <ToastContainer />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
