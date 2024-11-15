import { useState } from "react";

import UnsplashImage from "../../types/UnsplashImage";
import { convertUnsplashImagesToGalleryPhotos } from "../../utils/ImageConverter";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { MasonryPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "react-photo-album/masonry.css";

interface GalleryProps {
  images: UnsplashImage[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <MasonryPhotoAlbum
        photos={convertUnsplashImagesToGalleryPhotos(images, "thumb")}
        onClick={({ index }) => setIndex(index)}
        sizes={{
          size: "1200px",
          sizes: [
            { viewport: "(max-width: 767px)", size: "calc(100vw - 32px)" },
            { viewport: "(max-width: 1479px)", size: "calc(100vw - 188px)" },
          ],
        }}
      />

      <Lightbox
        slides={convertUnsplashImagesToGalleryPhotos(images, "full")}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        // enable optional lightbox plugins
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
      />
    </>
  );
};

export default Gallery;
