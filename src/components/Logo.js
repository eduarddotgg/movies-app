import { styled } from '@mui/material/styles';

const Root = styled('h1')(() => ({
  display: 'flex',
  lineHeight: 1,
  width: '100px',
}));

const Logo = () => {
  return (
    <Root>The Movie Search.</Root>
  )
}

export default Logo;
