import searchFill from '@iconify/icons-eva/search-fill';
import { Box, Button, Input, InputAdornment, Stack } from '@mui/material';
import { Icon } from '@iconify/react/dist/iconify';
import { useState } from 'react';

const Searchbar = ({onSearch}) => {
  const [query, setQuery] = useState('');

  const submit = (event) => {
    event.preventDefault();

    if (query !== '') {
      onSearch(query);
    }
  }

  return (
    <form onSubmit={submit}>
      <Stack direction="row">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          fullWidth
          placeholder="Search…"
          startAdornment={
            <InputAdornment position="start">
              <Box
                component={Icon}
                icon={searchFill}
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          }
          sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
        />
        <Button disabled={query === ''} variant="contained" size="large" type="submit">Search</Button>
     </Stack>
    </form>
  )
};

export default Searchbar;
