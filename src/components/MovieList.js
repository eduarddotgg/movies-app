import { Stack } from '@mui/material';

import MovieListItem from './MovieListItem';

const MovieList = ({movies, handleCurrentMovie}) => {
  return (
    <>
      <Stack direction="column" spacing={4}>
        {movies.map((movie) => (
          <MovieListItem key={movie.id} movie={movie} handleCurrentMovie={handleCurrentMovie}/>
        ))}
      </Stack>
    </>
  )
};

export default MovieList;
