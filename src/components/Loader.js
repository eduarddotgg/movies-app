import { CircularProgress, Stack } from '@mui/material';

const Loader = () => {
  return (
    <Stack direction="row" justifyContent="center">
      <CircularProgress />
    </Stack>
  )
};

export default Loader;
