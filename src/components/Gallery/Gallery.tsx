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
          // TODO: implement Favorite saving
          extras: (_, { photo: photo }) => (
            <FavoriteBanner
              selected={isFavorite(photo)}
              onToggle={(selected) => toggleFavorite(selected, photo)}
            />
          ),
        }}
      />

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={images}
        index={index}
        // enable optional lightbox plugins
        plugins={[Zoom]}
      />
    </>
  );
};

export default Gallery;
