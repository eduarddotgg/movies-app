import axios from 'axios';
import closeOutline from '@iconify/icons-eva/close-outline';
import { Icon } from '@iconify/react/dist/iconify';
import { IconButton, Link, Slide, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import DetailsPanel from '../atoms/DetailsPanel';
import ErrorMessage from './ErrorMessage';
import LinkImage from '../atoms/LinkImage';
import Loader from './Loader';
import { SEARCH_MOVIE_API, WIKIPEDIA_API } from '../utils/constants';

const MovieDetails = ({currentMovie, visible, showRelatedMovies, close}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [wikipediaDetails, setWikipediaDetails] = useState(null);
  const [imdbDetails, setImdbDetails] = useState(null);

  useEffect( () => {
    setLoading(true);

    if (currentMovie) {
      async function fetchData () {
        try {
          const releaseDate = new Date(currentMovie.releaseDate);
          const releaseYear = releaseDate.getFullYear();
          const imdbResults = await axios.get(`${SEARCH_MOVIE_API}${currentMovie.name} ${releaseYear}`);
          const imdbMovieData = imdbResults.data.results[0]
          const wikipediaResults = await axios.get(`${WIKIPEDIA_API}${imdbMovieData.id}`);

          setImdbDetails(imdbResults.data.results[0]);
          setWikipediaDetails(wikipediaResults.data);
        } catch (e) {
          setError(true);
        }
        setLoading(false);
      }

     fetchData();
    }
  }, [currentMovie]);

  if (loading) {
    return (
      <Slide direction="left" in={visible} mountOnEnter unmountOnExit>
        <DetailsPanel sx={{ alignItems: 'center'}}>
          <Loader/>

          <IconButton onClick={() => { close() }} sx={{ position: 'absolute', top: '24px', right: '24px'}}>
            <Icon icon={closeOutline}  width={24} height={24}/>
          </IconButton>
        </DetailsPanel>
      </Slide>
    )
  }

  if (error) return <ErrorMessage/>;

  return (
    <Slide direction="left" in={visible} mountOnEnter unmountOnExit>
      <DetailsPanel>

        <Stack direction="row" spacing={4}>
          <Stack direction="column" spacing={4}>

            <Stack direction="column" spacing={2}>
              <Typography variant="h4">{ wikipediaDetails ? wikipediaDetails.title : '' }</Typography>
              <Typography variant="body1" sx={{ maxHeight: '340px', overflow: 'hidden' }}>{ wikipediaDetails ? wikipediaDetails.plotShort.plainText : '' }</Typography>
            </Stack>

            <Stack direction="row" spacing={2}>
              <Link href={imdbDetails ? `https://www.imdb.com/title/${imdbDetails.id}/` : '#' } underline="none" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <LinkImage src="/images/imdb.png" alt=""/>
                <Typography component="span">IMDb</Typography>
              </Link>

              <Link href={wikipediaDetails ? wikipediaDetails.url : '#'} underline="none" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <LinkImage src="/images/wikipedia.png" alt=""/>
                <Typography component="span">Wikipedia</Typography>
              </Link>

              <Link component="button" onClick={() => {showRelatedMovies(currentMovie.id)}} underline="none" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <LinkImage src="/images/related.png" alt=""/>
                <Typography component="span">Related</Typography>
              </Link>
            </Stack>

          </Stack>
        </Stack>

        <IconButton onClick={() => { close() }} sx={{ position: 'absolute', top: '24px', right: '24px'}}>
          <Icon icon={closeOutline}  width={24} height={24}/>
        </IconButton>

      </DetailsPanel>
    </Slide>
  )
};

export default MovieDetails;
