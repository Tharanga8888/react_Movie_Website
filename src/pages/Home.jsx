import MovieCard from "../components/MovieCard";
import { useState, useEffect, useCallback } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  //State variables for search query, movies list, error messages, and loading status
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  //Load popular movies when the component mounts
  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.error("Error loading movies:", err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  //Memoized search function to prevent unnecessary re-renders
  const handleSearch = useCallback(
    async (e) => {
      e.preventDefault();
      if (!searchQuery.trim() || loading) return;

      setLoading(true);
      try {
        const searchResults = await searchMovies(searchQuery);
        setMovies(searchResults.length ? searchResults : []);
        setError(searchResults.length ? null : "No movies found.");
      } catch (err) {
        console.error("Search error:", err);
        setError("Failed to search movies...");
      } finally {
        setLoading(false);
      }
    },
    [searchQuery, loading]
  );

  return (
    <div className="home">
      {/* Search bar for movies */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {/* Display error message if any */}
      {error && <div className="error-message" aria-live="polite">{error}</div>}

      {/* Show loading state, movies list, or a "No Movies" message */}
      {loading ? (
        <div className="loading" aria-live="assertive">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.length > 0 ? (
            movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)
          ) : (
            !error && <div className="no-movies">No movies found.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
