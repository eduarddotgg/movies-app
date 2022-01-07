import { styled } from '@mui/material/styles';
import { Icon } from '@iconify/react';
import { Card, Link, Stack, Typography } from '@mui/material';
import starFill from '@iconify/icons-eva/star-fill';

const SmallPoster = styled('img')(() => ({
  width: '120px'
}))

const MovieListItem = ({ movie, handleCurrentMovie }) => {
  let poster

  if (movie.poster && movie.poster.small) {
    poster = <SmallPoster src={movie.poster.small}/>;
  } else {
    poster = <SmallPoster src="/images/no-image.png" alt=""/>;
  }

  return (
    <Card>
      <Stack direction="row" spacing={0}>

        { poster }

        <Stack direction="column" spacing={2} sx={{ py: 2, px: 2, flexGrow: 1 }}>
          <Stack direction="column" alignItems="flex-start" spacing={0}>
            <Stack direction="row" spacing={1}>
              {movie.genres.map((genre) => (
                <Typography key={genre.id} variant="body2">{genre.name}</Typography>
              ))}
            </Stack>

            <Link component="button" variant="h6" underline="none" onClick={() => handleCurrentMovie(movie)} sx={{textAlign: 'left'}}>
              <Typography variant="h6" component="span">{ movie.name }</Typography>
            </Link>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ mt: 'auto !important' }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Icon icon={starFill} width={24} height={24} />
              <Typography variant="body1">{ movie.score }</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  )
};

export default MovieListItem;
