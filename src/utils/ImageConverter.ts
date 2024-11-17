import UnsplashImage from "../types/UnsplashImage";
import GalleryPhoto from "../types/GalleryPhoto";

export function convertUnsplashImagesToGalleryPhotos(images: UnsplashImage[]): GalleryPhoto[] {
  return images.map((image) => ({
    id: image.id,
    src: image.urls.full,
    width: image.width,
    height: image.height,
    alt: image.alt_description,
    thumbnail: image.urls.small,
    full: image.urls.full,
  }));
}
