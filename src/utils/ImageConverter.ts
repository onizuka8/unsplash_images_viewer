import UnsplashImage from "../types/UnsplashImage";
import GalleryPhoto, { GalleryPhotoSrcSet } from "../types/GalleryPhoto";

/**
 * Build a srcSet string for an image.
 * @param urls The image URLs.
 * @returns The srcSet string.
 *
 * This is useful as MasonryPhotoAlbum handles srcSet strings for images.
 */

function buildSrcSet(image: UnsplashImage): GalleryPhotoSrcSet[] {
  return Object.entries(image.urls)
    .map(([, value]) => {
      const widthMatch = value.match(/w=(\d+)/);
      if (!widthMatch) return null;
      const width = parseInt(widthMatch[1]);
      const height = (image.height / image.width) * width;
      return { src: value, width, height } as GalleryPhotoSrcSet;
    })
    .filter((srcSet): srcSet is GalleryPhotoSrcSet => srcSet !== null);
}

export function convertUnsplashImagesToGalleryPhotos(images: UnsplashImage[]): GalleryPhoto[] {
  return images.map((image) => ({
    id: image.id,
    src: image.urls.full,
    width: image.width,
    height: image.height,
    thumbnail: image.urls.small,
    full: image.urls.full,
    srcSet: buildSrcSet(image),
  }));
}
