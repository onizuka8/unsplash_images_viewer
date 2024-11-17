import React, { useState } from "react";
import { fetchImages } from "../../api/unsplash";

import styles from "./ImageSearch.module.css";
import Gallery from "../Gallery/Gallery";
import { generate } from "random-words";
import { useFavorites } from "../../hooks/useFavorites";
import { convertUnsplashImagesToGalleryPhotos } from "../../utils/ImageConverter";
import GalleryPhoto from "../../types/GalleryPhoto";

/**
 * ImageSearch component allows users to search for images using the Unsplash API.
 * It provides a search input, displays the search results as images, and includes pagination controls.
 */
const ImageSearch: React.FC = () => {
  const itemsPerPage = 15; // Define the number of items per page for search
  const [query, setQuery] = useState("");
  const [previousQuery, setPreviousQuery] = useState(""); // Store previous query
  const [images, setImages] = useState<GalleryPhoto[]>([]); // Images to display in the gallery
  const [searchImages, setSearchImages] = useState<GalleryPhoto[]>([]); // Search result images
  const [page, setPage] = useState(1); // Current page for search
  const [totalPages, setTotalPages] = useState(1); // Total pages for search
  const [favoritesPage, setFavoritesPage] = useState(1); // Current page for favorites
  const [favoritesTotalPages, setFavoritesTotalPages] = useState(1); // Total pages for favorites
  const [favoritesView, setFavoritesView] = useState(false); // Toggle between search and favorites view
  const { getFavorites } = useFavorites();

  // Paginate favorites
  const paginateFavorites = (page: number) => {
    const allFavorites = getFavorites();
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedFavorites = allFavorites.slice(startIndex, startIndex + itemsPerPage);

    setImages(paginatedFavorites);
    setFavoritesTotalPages(Math.ceil(allFavorites.length / itemsPerPage));
  };

  // Handle search form submission
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const searchQuery = query || (generate() as string);

    if (searchQuery !== previousQuery) {
      setPreviousQuery(searchQuery);
      try {
        const data = await fetchImages(searchQuery, 1, itemsPerPage);
        const newImages = convertUnsplashImagesToGalleryPhotos(data.results);
        setSearchImages(newImages);
        setImages(newImages);
        setPage(1);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Handle search pagination
  const handleSearchPagination = async (direction: "next" | "prev") => {
    const newPage = direction === "next" ? page + 1 : page - 1;
    try {
      const data = await fetchImages(query, newPage, itemsPerPage);
      const newImages = convertUnsplashImagesToGalleryPhotos(data.results);
      setSearchImages(newImages);
      setImages(newImages);
      setPage(newPage);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle favorites pagination
  const handleFavoritesPagination = (direction: "next" | "prev") => {
    const newPage = direction === "next" ? favoritesPage + 1 : favoritesPage - 1;
    setFavoritesPage(newPage);
    paginateFavorites(newPage);
  };

  // Toggle between search and favorites views
  const handleFavoriteToggle = (e: React.FormEvent) => {
    e.preventDefault();
    if (favoritesView) {
      // Switch back to search view
      setImages(searchImages);
      setFavoritesView(false);
    } else {
      // Switch to favorites view
      paginateFavorites(1); // Load the first page of favorites
      setFavoritesPage(1);
      setFavoritesView(true);
    }
  };

  return (
    <div className={styles.container}>
      {!favoritesView && (
        <form className={styles.searchForm} onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for images..."
            className={styles.searchInput}
          />
          <button
            type="submit"
            className={styles.searchButton}
            disabled={query !== "" && previousQuery === query}
          >
            Search
          </button>
        </form>
      )}

      <button className={styles.searchButton} onClick={handleFavoriteToggle}>
        {favoritesView ? "Back to Search" : "View Favorites"}
      </button>

      <Gallery images={images} />

      <div className={styles.pagination}>
        {!favoritesView ? (
          <>
            <button
              onClick={() => handleSearchPagination("prev")}
              disabled={page <= 1}
              className={styles.paginationButton}
            >
              Previous
            </button>
            <span className={styles.pageInfo}>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => handleSearchPagination("next")}
              disabled={page >= totalPages}
              className={styles.paginationButton}
            >
              Next
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => handleFavoritesPagination("prev")}
              disabled={favoritesPage <= 1}
              className={styles.paginationButton}
            >
              Previous
            </button>
            <span className={styles.pageInfo}>
              Page {favoritesPage} of {favoritesTotalPages}
            </span>
            <button
              onClick={() => handleFavoritesPagination("next")}
              disabled={favoritesPage >= favoritesTotalPages}
              className={styles.paginationButton}
            >
              Next
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageSearch;
