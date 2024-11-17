import React, { useState } from "react";
import { fetchImages } from "../../api/unsplash";

import styles from "./ImageSearch.module.css";
import Gallery from "../Gallery/Gallery";
import { generate } from "random-words";
import { useFavorites } from "../../hooks/useFavorites";
import { convertUnsplashImagesToGalleryPhotos } from "../../utils/ImageConverter";
import GalleryPhoto from "../../types/GalleryPhoto";
import { createPortal } from "react-dom";
import Pagination from "../Pagination/Pagination";

import { BiSolidBookmarkStar, BiArrowBack, BiSearchAlt2 } from "react-icons/bi";

import PacmanLoader from "react-spinners/PacmanLoader";

/**
 * ImageSearch component allows users to search for images using the Unsplash API.
 * It provides a search input, displays the search results as images, and includes pagination controls.
 */
const ImageSearch: React.FC = () => {
  const itemsPerPage = 15; // Define the number of items per page for search
  const buttonIconSize = "1.2em"; // Define the size of the pagination button icons
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [previousQuery, setPreviousQuery] = useState(String); // Store previous query
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: adds a smooth scrolling effect
    });
  };

  // Handle search form submission
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const searchQuery = query || (generate() as string);

    if (searchQuery !== previousQuery) {
      setPreviousQuery(searchQuery);
      setQuery(searchQuery);
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
    setLoading(false);
  };

  // Handle search pagination
  const handleSearchPagination = async (direction: "next" | "prev") => {
    setLoading(true);
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
    scrollToTop();
    setLoading(false);
  };

  // Handle favorites pagination
  const handleFavoritesPagination = (direction: "next" | "prev") => {
    const newPage = direction === "next" ? favoritesPage + 1 : favoritesPage - 1;
    setFavoritesPage(newPage);
    paginateFavorites(newPage);
    scrollToTop();
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

  const handleFavoriteUpdated = () => {
    // if we are in the favorite view, we need to update the images
    if (favoritesView) {
      paginateFavorites(favoritesPage);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <button className={styles.favoritesButton} onClick={handleFavoriteToggle}>
          {favoritesView ? (
            <BiArrowBack size={buttonIconSize} />
          ) : (
            <BiSolidBookmarkStar size={buttonIconSize} />
          )}
        </button>

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
              <BiSearchAlt2 size={buttonIconSize} color="black" />
            </button>
          </form>
        )}

        {favoritesView && <h1 className={styles.favoritesTitle}>Favorites</h1>}
      </div>

      <Gallery images={images} onFavoritesUpdated={handleFavoriteUpdated} />

      <div className={styles.pagination}>
        {!favoritesView ? (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handleSearchPagination}
          />
        ) : (
          <Pagination
            currentPage={favoritesPage}
            totalPages={favoritesTotalPages}
            onPageChange={handleFavoritesPagination}
          />
        )}
      </div>
      {loading &&
        createPortal(
          <div className={styles.spinnerContainer}>
            <PacmanLoader
              color={"rgba(250, 190, 0, 1)"}
              loading={loading}
              cssOverride={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>,
          document.body
        )}
    </div>
  );
};

export default ImageSearch;
