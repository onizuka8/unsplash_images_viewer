import { useState, useEffect } from "react";

import { MasonryPhotoAlbum } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import { Zoom, Captions } from "yet-another-react-lightbox/plugins";

import FavoriteBanner from "../FavoriteBanner/FavoriteBanner";
import CommentBanner from "../CommentBanner/CommentBanner";

import { useFavorites } from "../../hooks/useFavorites";
import { useComments } from "../../hooks/useComments";

import GalleryPhoto from "../../types/GalleryPhoto";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "react-photo-album/rows.css";
import "react-photo-album/masonry.css";

interface GalleryProps {
  images: GalleryPhoto[];
  onFavoritesUpdated?: () => void;
}

const Gallery: React.FC<GalleryProps> = ({ images, onFavoritesUpdated }) => {
  const [index, setIndex] = useState(-1);
  const [photos, setPhotos] = useState<GalleryPhoto[]>(images);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { saveComment, removeComment, getCommentByPhoto } = useComments();

  // Sync photos state with images prop when images updates
  useEffect(() => {
    setPhotos(images);
  }, [images]);

  const handleFavoriteOnToggle = (selected: boolean, photo: GalleryPhoto) => {
    const result = toggleFavorite(selected, photo);
    if (onFavoritesUpdated && result) onFavoritesUpdated();

    return result;
  };

  const handleCommentOnSave = (comment: string, photo: GalleryPhoto) => {
    if (comment === "") {
      removeComment(photo);
    } else {
      saveComment(photo, comment);
    }
  };

  return (
    <>
      <MasonryPhotoAlbum
        photos={photos}
        onClick={({ index }) => setIndex(index)}
        render={{
          extras: (_, { photo: photo }) => (
            <>
              <FavoriteBanner
                selected={isFavorite(photo)}
                onToggle={(selected) => handleFavoriteOnToggle(selected, photo)}
              />
              <CommentBanner
                comment={getCommentByPhoto(photo) || ""}
                onCommentSave={(comment) => handleCommentOnSave(comment, photo)}
              />
            </>
          ),
        }}
      />

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={photos}
        index={index}
        plugins={[Zoom, Captions]}
      />
    </>
  );
};

export default Gallery;
