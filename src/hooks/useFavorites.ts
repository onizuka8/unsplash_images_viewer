/**
 * Custom hook to manage favorite items using localStorage.
 *
 * @returns {Object} An object containing the following functions:
 * - `isFavorite`: Checks if a given reference is in the list of favorites.
 * - `toggleFavorite`: Adds or removes a reference from the list of favorites based on the selected state.
 *
 * @function getFavorites
 * Retrieves the list of favorite items from localStorage.
 * @returns {string[]} An array of favorite item references.
 *
 * @function isFavorite
 * Checks if a given reference is in the list of favorites.
 * @param {string} reference - The reference to check.
 * @returns {boolean} True if the reference is a favorite, false otherwise.
 *
 * @function toggleFavorite
 * Adds or removes a reference from the list of favorites based on the selected state.
 * @param {boolean} selected - If true, adds the reference to favorites; if false, removes it.
 * @param {string} reference - The reference to add or remove.
 * @returns {boolean} True if the operation was successful, false otherwise.
 */
export const useFavorites = () => {
  const getFavorites = (): string[] => JSON.parse(localStorage.getItem("favorites") || "[]");

  const isFavorite = (reference: string) => getFavorites().includes(reference);

  const toggleFavorite = (selected: boolean, reference: string) => {
    try {
      const favorites = getFavorites();
      if (selected) {
        favorites.push(reference);
      } else {
        const index = favorites.indexOf(reference);
        if (index > -1) {
          favorites.splice(index, 1);
        }
      }
      localStorage.setItem("favorites", JSON.stringify(favorites));
      return true;
    } catch (error) {
      console.error("Error saving favorite", error);
      return false;
    }
  };

  return { isFavorite, toggleFavorite };
};
