import type { Photo } from "react-photo-album";
import UnsplashImage, { UnsplashImageSize } from "../types/UnsplashImage";

export function convertUnsplashImagesToGalleryPhotos(
  images: UnsplashImage[],
  size: UnsplashImageSize
): Photo[] {
  return images.map((image) => ({
    src: image.urls[size],
    width: image.width,
    height: image.height,
    alt: image.alt_description,
    thumbnail: image.urls.thumb,
  }));
}
