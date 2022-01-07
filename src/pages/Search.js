import arrowBackOutline from '@iconify/icons-eva/arrow-back-outline';
import { Icon } from '@iconify/react/dist/iconify';
import { IconButton, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import MovieDetails from '../components/MovieDetails';
import Searchbar from '../components/Searchbar';
import SearchResults from '../components/SearchResults';
import { RELATED_MOVIES } from '../graphql/related-movies';
import { SEARCH_MOVIES } from '../graphql/search-movies';

const Search = () => {
  let [currentMovie, setCurrentMovie] = useState(null);
  let [movieDetailsVisible, setMovieDetailsVisibility] = useState(false);
  let [isRelatedSearch, setRelatedSearch] = useState(false)
  let [movieList, setMovieList] = useState([]);
  let [loading, setSetLoading] = useState(null);
  let [error, setError] = useState(null);

  const [getSearchedMovies, searchedMovies] = useLazyQuery(SEARCH_MOVIES);
  const [getRelatedMovies, relatedMovies] = useLazyQuery(RELATED_MOVIES);

  const handleCurrentMovie = (movieName) => {
    setMovieDetailsVisibility(true);
    setCurrentMovie(movieName);
  };

  const handleSearch = async (query) => {
    handleClose();
    setRelatedSearch(false);
    await getSearchedMovies({ variables: { query }});
  }

  const handleClose = () => setMovieDetailsVisibility(false);
  const handleResetSearch = () => setRelatedSearch(false);

  const showRelatedMovies = async (movieId) => {
    setRelatedSearch(true);
    await getRelatedMovies({ variables: { id: movieId } });
  };

  useEffect( () => {
    if (!isRelatedSearch) {
      setSetLoading(searchedMovies.loading)
      setError(searchedMovies.error)
    } else {
      setSetLoading(relatedMovies.loading)
      setError(relatedMovies.error)
    }

    if (!isRelatedSearch && (searchedMovies || relatedMovies)) {
      setMovieList(searchedMovies.data ? searchedMovies.data.searchMovies : null);
    } else {
      setMovieList(relatedMovies.data ? relatedMovies.data.movie.similar : null);
    }
  }, [
    isRelatedSearch,
    searchedMovies,
    relatedMovies
  ]);

  return (
    <Stack direction="column" spacing={4}>
      <Searchbar onSearch={handleSearch}/>

      <Stack direction="column" spacing={2}>
        {isRelatedSearch && !relatedMovies.loading ? (
          <div>
            <IconButton onClick={() => { handleResetSearch() }}>
              <Icon icon={arrowBackOutline}  width={24} height={24}/>
            </IconButton>
          </div>
        ): (<></>)}

        <SearchResults
          loading={loading}
          error={error}
          handleCurrentMovie={handleCurrentMovie}
          movies={movieList}
        />
      </Stack>
      <div>
        <MovieDetails
          currentMovie={currentMovie}
          visible={movieDetailsVisible}
          showRelatedMovies={showRelatedMovies}
          close={handleClose}/>
      </div>
    </Stack>
  )
}

export default Search;
