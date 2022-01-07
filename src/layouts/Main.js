import { Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

import Logo from '../components/Logo';

const Root = styled('div')({
  margin: '0 auto',
  maxWidth: '680px',
  overflow: 'hidden',
  padding: '48px 24px 64px',
  width: '100%',
});

const MainLayout = () => {
  return(
    <Root>
      <Stack direction="column" spacing={10}>
        <Logo/>
        <div>
          <Outlet/>
        </div>
      </Stack>
    </Root>
  )
};

export default MainLayout;
