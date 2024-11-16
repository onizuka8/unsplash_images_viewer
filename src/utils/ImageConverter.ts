import UnsplashImage, { UnsplashImageSize } from "../types/UnsplashImage";
import GalleryPhoto from "../types/GalleryPhoto";

export function convertUnsplashImagesToGalleryPhotos(
  images: UnsplashImage[],
  size: UnsplashImageSize
): GalleryPhoto[] {
  return images.map((image) => ({
    id: image.id,
    src: image.urls[size],
    width: image.width,
    height: image.height,
    alt: image.alt_description,
    thumbnail: image.urls.thumb,
  }));
}
