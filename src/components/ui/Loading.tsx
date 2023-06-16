import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';

export default function Loading({ positionLoading = 'relative' }) {

  return (
    <Box sx={{ display: 'flex' }}>
      <Grid container justifyContent="center" alignItems="center" sx={{ width:'100%', height: '100%', position: positionLoading }}>
        <CircularProgress />
      </Grid>
    </Box>
  );
}
