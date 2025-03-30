import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";
import { useCallback } from "react";

function MovieCard({ movie }) {
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
    const favorite = isFavorite(movie?.id);

    //Memoized function to handle adding/removing movies from favorites
    const onFavoriteClick = useCallback((e) => {
        e.preventDefault();
        if (!movie?.id) return; //Ensure the movie has a valid ID before proceeding

        if (favorite) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites(movie);
        }
    }, [favorite, movie, addToFavorites, removeFromFavorites]);

    return (
        <div className="movie-card">
            <div className="movie-poster">
                {/*Display the movie poster if available; otherwise, show a placeholder*/}
                {movie?.poster_path ? (
                    <img 
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                        alt={movie.title || "Movie Poster"} 
                        loading="lazy" //Improve performance by lazy loading images
                    />
                ) : (
                    <div className="movie-placeholder">No Image</div>
                )}
                <div className="movie-overlay">
                    {/* Button toggles favorite status */}
                    <button 
                        className={`favorite-btn ${favorite ? "active" : ""}`} 
                        onClick={onFavoriteClick} 
                        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        ♥
                    </button>
                </div>
            </div>
            <div className="movie-info">
                {/* Ensure fallback values for missing data */}
                <h3>{movie?.title || "Untitled"}</h3>
                <p>{movie?.release_date?.split("-")[0] || "Unknown"}</p>
            </div>
        </div>
    );
}

export default MovieCard;
