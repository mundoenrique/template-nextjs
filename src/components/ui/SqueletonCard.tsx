import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Variants() {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rounded" height={120} />
      <Skeleton variant="rounded" height={120} />
    </Stack>
  );
}
