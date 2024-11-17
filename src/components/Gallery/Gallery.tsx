import { useState } from "react";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { Zoom } from "yet-another-react-lightbox/plugins";

import MasonryView from "./MasonryView";

import "react-photo-album/rows.css";
import "react-photo-album/masonry.css";
import FavoriteBanner from "../FavoriteBanner/FavoriteBanner";

import { useFavorites } from "../../hooks/useFavorites";
import GalleryPhoto from "../../types/GalleryPhoto";

interface GalleryProps {
  images: GalleryPhoto[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [index, setIndex] = useState(-1);
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <>
      <MasonryView
        photos={images}
        imageField={"thumbnail"}
        onClick={({ index }) => setIndex(index)}
        render={{
          extras: (_, { photo: photo }) => (
            <FavoriteBanner
              selected={isFavorite(photo)}
              // We need to pass the full image a src for the Favorites
              // as the Lightbox will use the src field for the full image.
              // Eventually, can improve this by wrapping the Lightbox component
              // and adding a imageFiled prop similary to what we do here with  the MasonryView
              onToggle={(selected) => toggleFavorite(selected, { ...photo, src: photo.full })}
            />
          ),
        }}
      />

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={images}
        index={index}
        plugins={[Zoom]}
      />
    </>
  );
};

export default Gallery;
