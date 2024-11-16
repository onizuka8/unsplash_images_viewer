import { useState } from "react";

import UnsplashImage from "../../types/UnsplashImage";
import { convertUnsplashImagesToGalleryPhotos } from "../../utils/ImageConverter";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { Zoom } from "yet-another-react-lightbox/plugins";

import { MasonryPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import "react-photo-album/masonry.css";
import FavoriteBanner from "../FavoriteBanner/FavoriteBanner";

import { useFavorites } from "../../hooks/useFavorites";

interface GalleryProps {
  images: UnsplashImage[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [index, setIndex] = useState(-1);

  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <>
      <MasonryPhotoAlbum
        photos={convertUnsplashImagesToGalleryPhotos(images, "small")}
        onClick={({ index }) => setIndex(index)}
        render={{
          // TODO: implement Favorite saving
          extras: (_, { photo: photo }) => (
            <FavoriteBanner
              selected={isFavorite(photo.id)}
              reference={photo.id}
              onToggle={toggleFavorite}
            />
          ),
        }}
      />

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={convertUnsplashImagesToGalleryPhotos(images, "full")}
        index={index}
        // enable optional lightbox plugins
        plugins={[Zoom]}
      />
    </>
  );
};

export default Gallery;
