/**
 * Represents an image from Unsplash.
 * This type is use to represent the shape of an image object returned from the Unsplash API.
 * Only the properties used in this project are included in this type.
 * For more information on the Unsplash API, see https://unsplash.com/documentation
 *
 */

interface UnsplashImageUrls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

interface UnsplashImage {
  id: string;
  urls: UnsplashImageUrls;
  alt_description: string;
  user: { name: string };
  description: string;
  width: number;
  height: number;
}

export default UnsplashImage;
