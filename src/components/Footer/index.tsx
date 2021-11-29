import {Box, Typography} from '@mui/material'
import {useBlockNumber} from '@w3u/useweb3'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

const Footer = () => {
  const number = useBlockNumber()

  return (
    <Box
      sx={{
        svg: {
          fontSize: '10px',
          mr: 1
        }
      }}
    >
      <Typography variant='body2' display='flex' alignItems='center' justifyContent='flex-end' color='primary.main'>
        <FiberManualRecordIcon color='primary' />
        {number}
      </Typography>
    </Box>
  )
}

export default Footer
