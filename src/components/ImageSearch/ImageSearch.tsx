import React, { useState } from "react";
import { fetchImages } from "../../api/unsplash";
import UnsplashImage from "../../types/UnsplashImage";
import styles from "./ImageSearch.module.css";
import Gallery from "../Gallery/Gallery";
import { generate } from "random-words";

/**
 * ImageSearch component allows users to search for images using the Unsplash API.
 * It provides a search input, displays the search results as images, and includes pagination controls.
 */
const ImageSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [previousQuery, setPreviousQuery] = useState(""); // Store previous query
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // On submission of the search form, fetch images from the Unsplash API 1st page
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    // If no query is provided, generate a random search query of one word
    const searchQuery = query || (generate() as string);

    console.log(searchQuery);

    // To avoid hitting the APIs if the query didn't change
    if (searchQuery !== previousQuery) {
      setPreviousQuery(searchQuery);
      try {
        const data = await fetchImages(searchQuery, 1);
        setImages(data.results);
        setPage(1);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Fetch the next or previous page of images from the Unsplash API
  const handlePagination = async (direction: "next" | "prev") => {
    const newPage = direction === "next" ? page + 1 : page - 1;
    try {
      const data = await fetchImages(query, newPage);
      setImages(data.results);
      setPage(newPage);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
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
          disabled={query != "" && previousQuery === query}
        >
          Search
        </button>
      </form>

      <Gallery images={images} />

      <div className={styles.pagination}>
        <button
          onClick={() => handlePagination("prev")}
          disabled={page <= 1}
          className={styles.paginationButton}
        >
          Previous
        </button>
        <span className={styles.pageInfo}>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePagination("next")}
          disabled={page >= totalPages}
          className={styles.paginationButton}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ImageSearch;
