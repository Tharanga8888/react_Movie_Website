import { createContext, useState, useContext, useEffect } from "react";


const MovieContext = createContext();

//Custom hook to consume the context easily
export const useMovieContext = () => useContext(MovieContext);

//MovieProvider component to manage movie-related state
export const MovieProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    //Load favorite movies from localStorage when the component mounts
    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites");
        if (storedFavs) {
            try {
                setFavorites(JSON.parse(storedFavs));
            } catch (error) {
                console.error("Failed to parse favorites from localStorage:", error);
            }
        }
    }, []);

    //Save favorite movies to localStorage whenever favorites change
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    //Function to add a movie to favorites
    const addToFavorites = (movie) => {
        setFavorites((prev) => [...prev, movie]);
    };

    //Function to remove a movie from favorites
    const removeFromFavorites = (movieId) => {
        setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
    };

    //Function to check if a movie is in favorites
    const isFavorite = (movieId) => favorites.some((movie) => movie.id === movieId);

    //Context value containing state and actions
    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    };

    return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};
