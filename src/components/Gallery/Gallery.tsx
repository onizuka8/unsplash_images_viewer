import { useState, useEffect } from "react";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { Zoom, Captions } from "yet-another-react-lightbox/plugins";

import "yet-another-react-lightbox/plugins/captions.css";
import { MasonryPhotoAlbum } from "react-photo-album";

import "react-photo-album/rows.css";
import "react-photo-album/masonry.css";
import FavoriteBanner from "../FavoriteBanner/FavoriteBanner";
import CommentBanner from "../CommentBanner/CommentBanner";

import { useFavorites } from "../../hooks/useFavorites";
import { useComments } from "../../hooks/useComments";
import GalleryPhoto from "../../types/GalleryPhoto";

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

  return (
    <>
      <MasonryPhotoAlbum
        photos={photos}
        onClick={({ index }) => setIndex(index)}
        render={{
          extras: (_, { photo: elmPhoto }) => (
            <>
              <FavoriteBanner
                selected={isFavorite(elmPhoto)}
                // We need to pass the full image a src for the Favorites
                // as the Lightbox will use the src field for the full image.
                // Eventually, can improve this by wrapping the Lightbox component
                // and adding a imageFiled prop similary to what we do here with  the MasonryView
                onToggle={(selected) => {
                  const result = toggleFavorite(selected, { ...elmPhoto, src: elmPhoto.full });
                  if (onFavoritesUpdated && result) onFavoritesUpdated();

                  return result;
                }}
              />
              {
                <CommentBanner
                  comment={getCommentByPhoto(elmPhoto) || ""}
                  onCommentSave={(comment) => {
                    if (comment === "") {
                      removeComment(elmPhoto);
                    } else {
                      saveComment(elmPhoto, comment);
                    }
                  }}
                />
              }
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
