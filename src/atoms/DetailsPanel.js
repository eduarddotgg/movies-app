import { alpha, styled } from '@mui/material/styles';

const DetailsPanel = styled('div')(({ theme }) => ({
  alignItems: 'center',
  backdropFilter: 'blur(6px)',
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  maxWidth: '380px',
  padding: '48px 24px 64px',
  position: 'fixed',
  right: 0,
  top: 0,
  width: '100%',
  zIndex: 99,
}));

export default DetailsPanel;
