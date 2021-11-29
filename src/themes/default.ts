import {createTheme} from '@mui/material'

export const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#1164FB'
    }
  },
  components: {
    MuiListItemButton: {
      defaultProps: {
        sx: {
          borderRadius: '6px'
        }
      }
    },
    MuiSelect: {
      defaultProps: {
        sx: {
          fontSize: '14px'
        }
      }
    },
    MuiMenuItem: {
      defaultProps: {
        sx: {
          fontSize: '14px',
          padding: '10px 20px'
        }
      }
    },
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
