import React from "react";
import GalleryPhoto from "../../types/GalleryPhoto";
import { MasonryPhotoAlbum, MasonryPhotoAlbumProps, ClickHandler } from "react-photo-album";

interface MasonryViewProps extends MasonryPhotoAlbumProps<GalleryPhoto> {
  photos: GalleryPhoto[]; // Photo is the type used by react-photo-album
  imageField?: keyof GalleryPhoto; // Specify which field to use for the image source
  onClick?: ClickHandler<GalleryPhoto>;
}

const MasonryView: React.FC<MasonryViewProps> = ({
  imageField = "src", // Default to the `src` field
  photos,
  ...rest
}) => {
  // Transform the photos array to replace the `src` field with the specified field
  const transformedPhotos = photos.map((photo) => ({
    ...photo,
    src: photo[imageField] as string, // Replace `src` with the specified field
  }));
  return <MasonryPhotoAlbum photos={transformedPhotos} {...rest} />;
};

export default MasonryView;
