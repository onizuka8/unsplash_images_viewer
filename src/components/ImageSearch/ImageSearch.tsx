import { useState } from "react";
import { fetchImages } from "../../api/unsplash";

import Gallery from "../Gallery/Gallery";
import PaginationControls from "../Pagination/PaginationControls";
import GalleryPhoto from "../../types/GalleryPhoto";
import { generate } from "random-words";
import { BiSolidBookmarkStar, BiArrowBack, BiSearchAlt2 } from "react-icons/bi";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

import { convertUnsplashImagesToGalleryPhotos } from "../../utils/ImageConverter";
import { useFavorites } from "../../hooks/useFavorites";

import styles from "./ImageSearch.module.css";

const ITEMS_PER_PAGE = 15;
const BUTTON_ICON_SIZE = "1.2em";

const ImageSearch: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [previousQuery, setPreviousQuery] = useState("");
  const [images, setImages] = useState<GalleryPhoto[]>([]);
  const [searchImages, setSearchImages] = useState<GalleryPhoto[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [favoritesPage, setFavoritesPage] = useState(0);
  const [favoritesTotalPages, setFavoritesTotalPages] = useState(1);
  const [favoritesView, setFavoritesView] = useState(false);
  const { getFavorites } = useFavorites();

  const paginateFavorites = (page: number) => {
    const allFavorites = getFavorites();
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const paginatedFavorites = allFavorites.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    setImages(paginatedFavorites);
    setFavoritesTotalPages(Math.ceil(allFavorites.length / ITEMS_PER_PAGE));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const searchQuery = query || (generate() as string);

    if (searchQuery !== previousQuery) {
      setPreviousQuery(searchQuery);
      setQuery(searchQuery);
      try {
        const data = await fetchImages(searchQuery, 1, ITEMS_PER_PAGE);
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

  const handleSearchPagination = async (direction: "next" | "prev") => {
    setLoading(true);
    const newPage = direction === "next" ? page + 1 : page - 1;
    try {
      const data = await fetchImages(query, newPage, ITEMS_PER_PAGE);
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

  const handleFavoritesPagination = (direction: "next" | "prev") => {
    const newPage = direction === "next" ? favoritesPage + 1 : favoritesPage - 1;
    setFavoritesPage(newPage);
    paginateFavorites(newPage);
    scrollToTop();
  };

  const handleFavoriteToggle = (e: React.FormEvent) => {
    e.preventDefault();
    if (favoritesView) {
      setImages(searchImages);
      setFavoritesView(false);
    } else {
      paginateFavorites(1);
      setFavoritesPage(1);
      setFavoritesView(true);
    }
  };

  const handleFavoriteUpdated = () => {
    if (favoritesView) {
      paginateFavorites(favoritesPage);
    }
  };

  return (
    <div className={styles.container}>
      <SearchBar
        query={query}
        previousQuery={previousQuery}
        setQuery={setQuery}
        handleSearch={handleSearch}
        handleFavoriteToggle={handleFavoriteToggle}
        favoritesView={favoritesView}
      />
      <Gallery images={images} onFavoritesUpdated={handleFavoriteUpdated} />
      <PaginationControls
        favoritesView={favoritesView}
        page={page}
        totalPages={totalPages}
        favoritesPage={favoritesPage}
        favoritesTotalPages={favoritesTotalPages}
        handleSearchPagination={handleSearchPagination}
        handleFavoritesPagination={handleFavoritesPagination}
      />
      {loading && <LoadingSpinner />}
    </div>
  );
};

const SearchBar: React.FC<{
  query: string;
  previousQuery: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (e: React.FormEvent) => void;
  handleFavoriteToggle: (e: React.FormEvent) => void;
  favoritesView: boolean;
}> = ({ query, previousQuery, setQuery, handleSearch, handleFavoriteToggle, favoritesView }) => (
  <div className={styles.searchBar}>
    <button className={styles.favoritesButton} onClick={handleFavoriteToggle}>
      {favoritesView ? (
        <BiArrowBack size={BUTTON_ICON_SIZE} />
      ) : (
        <BiSolidBookmarkStar size={BUTTON_ICON_SIZE} />
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
          <BiSearchAlt2 size={BUTTON_ICON_SIZE} color="black" />
        </button>
      </form>
    )}
    {favoritesView && <h1 className={styles.favoritesTitle}>Favorites</h1>}
  </div>
);

export default ImageSearch;
