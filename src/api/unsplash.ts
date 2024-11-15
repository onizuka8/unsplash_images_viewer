import UnsplashImage from "../types/UnsplashImage";

// To not expose the Unsplash API key in the FE, a serverless function is use as "proxy" to fetch data from Unsplash API.
// For simplicity on localhost we can use Unsplash API directly (see readme for the .env file setup)
const UNSPLASH_API_BASE =
  import.meta.env.VITE_ENV === "dev" ? "https://api.unsplash.com" : "/api/unsplash";

// As only one api endpoint is being used, the response is defined here;
// worth moving to a separate file if more apis are used.

/**
 * Represents the response from the Unsplash API when performing a search.
 *
 * @interface UnsplashSearchResponse
 * @property {number} total - The total number of results found.
 * @property {number} total_pages - The total number of pages available.
 * @property {Array<UnsplashImage>} results - An array of UnsplashImage objects representing the search results.
 */
interface UnsplashSearchResponse {
  total: number;
  total_pages: number;
  results: Array<UnsplashImage>;
}

/**
 * Fetches images from the Unsplash API based on the provided query, page number, and number of results per page.
 *
 * @param {string} query - The search query to fetch images for.
 * @param {number} page - The page number to fetch.
 * @param {number} [perPage=10] - The number of results to fetch per page. Defaults to 10 if not provided.
 * @returns {Promise<UnsplashSearchResponse>} A promise that resolves to the search response from the Unsplash API.
 * @throws {Error} Throws an error if the fetch request fails.
 */
export const fetchImages = async (
  query: string,
  page: number,
  perPage: number = 20
): Promise<UnsplashSearchResponse> => {
  const accessKey = import.meta.env.VITE_API_KEY;

  const response = await fetch(
    `${UNSPLASH_API_BASE}/search/photos?query=${query}&page=${page}&per_page=${perPage}`,
    {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data from Unsplash API");
  }

  return response.json();
};
