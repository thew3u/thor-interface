import {createTheme} from '@mui/material'

export const defaultTheme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {}
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        disableElevation: true,
        size: 'large',
        sx: {
          textTransform: 'capitalize'
        }
      }
    },
    MuiListItem: {
      defaultProps: {
        sx: {
          padding: '10px 30px'
        }
      }
    },
    MuiListItemIcon: {
      defaultProps: {
        sx: {
          minWidth: '38px'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none !important'
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: '#ffffff'
        }
      }
    }
  }
})
