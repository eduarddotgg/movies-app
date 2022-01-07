import ErrorMessage from './ErrorMessage';
import Loader from './Loader';
import MovieList from './MovieList';
import NoResults from './NoResults';

const SearchResults = ({loading, error, movies, handleCurrentMovie}) => {
  if (loading) return <Loader/>;
  if (error) return <ErrorMessage/>;

  if (movies && movies.length > 0) {
    return <MovieList movies={movies} handleCurrentMovie={handleCurrentMovie}/>
  } else {
    return <NoResults/>
  }
};

export default SearchResults;

