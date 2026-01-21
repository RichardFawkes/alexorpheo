import { CircularProgress, Box } from "@mui/material"

export default function AdminLoading() {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        width: '100%',
        bgcolor: '#f8fafc'
      }}
    >
      <CircularProgress sx={{ color: '#d9b060' }} size={60} thickness={4} />
    </Box>
  )
}
