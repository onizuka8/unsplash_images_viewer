import GalleryPhoto from "../types/GalleryPhoto";

export const useFavorites = () => {
  const getFavorites = (): GalleryPhoto[] => {
    try {
      return JSON.parse(localStorage.getItem("favorites") || "[]");
    } catch (error) {
      console.error("Error parsing favorites from localStorage", error);
      return [];
    }
  };

  const isFavorite = (photo: GalleryPhoto): boolean => {
    return getFavorites().some((fav) => fav.id === photo.id);
  };

  const toggleFavorite = (selected: boolean, photo: GalleryPhoto): boolean => {
    try {
      const favorites = getFavorites();
      if (selected) {
        // We should never add the same photo twice but for safety we check
        // if it's already in the favorites array before inserting it
        if (!isFavorite(photo)) {
          favorites.push(photo);
          localStorage.setItem("favorites", JSON.stringify(favorites));
        }
      } else {
        const updatedFavorites = favorites.filter((fav) => fav.id !== photo.id);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      }

      return true;
    } catch (error) {
      console.error("Error updating favorites in localStorage", error);
      return false;
    }
  };

  return { isFavorite, toggleFavorite, getFavorites };
};
