//API key for TMDb API (Make sure to keep this secure in a production app)
const API_KEY = "9cfb8c33f5e442fdbd495001e01c91ee";

//Base URL for the TMDb API
const BASE_URL = "https://api.themoviedb.org/3";

/**
 * Fetches popular movies from the TMDb API.
 * @returns {Promise<Array>} A promise that resolves to an array of popular movies.
 */
console.log("API Key:", API_KEY);

export const getPopularMovies = async () => {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch popular movies. Status: ${response.status}`);
        }
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Error fetching popular movies:", error);
        return [];
    }
};


/**
 * Fetches movies from the TMDb API based on a search query.
 * @param {string} query - The search query string.
 * @returns {Promise<Array>} A promise that resolves to an array of matching movies.
 */

export const searchMovies = async (query) => {
    try {
        if (!query.trim()) {
            return []; //Return an empty array if the query is empty or contains only spaces
        }

        const response = await fetch(
            `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
        );
        if (!response.ok) {
            throw new Error(`Failed to search movies. Status: ${response.status}`);
        }
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Error searching movies:", error);
        return [];
    }
};
