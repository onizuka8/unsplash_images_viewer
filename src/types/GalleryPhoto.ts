import { Photo } from "react-photo-album";

export interface GalleryPhotoSrcSet {
  src: string;
  width: number;
  height: number;
}
export default interface GalleryPhoto extends Photo {
  id: string;
  thumbnail: string;
  full: string;
  srcSet: GalleryPhotoSrcSet[];
}
