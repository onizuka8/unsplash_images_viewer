import GalleryPhoto from "../types/GalleryPhoto";

interface PhotoComment {
  id: string; // Unique identifier for the photo
  comment: string; // User's comment
}

export const useComments = () => {
  const getComments = (): PhotoComment[] => {
    try {
      return JSON.parse(localStorage.getItem("comments") || "[]");
    } catch (error) {
      console.error("Error parsing comments from localStorage", error);
      return [];
    }
  };

  const getCommentByPhoto = (photo: GalleryPhoto): string | null => {
    const comments = getComments();
    const commentObj = comments.find((c) => c.id === photo.id);
    return commentObj ? commentObj.comment : null;
  };

  const saveComment = (photo: GalleryPhoto, comment: string): boolean => {
    try {
      const comments = getComments();
      const existingCommentIndex = comments.findIndex((c) => c.id === photo.id);

      if (existingCommentIndex !== -1) {
        // Update the existing comment
        comments[existingCommentIndex].comment = comment;
      } else {
        // Add a new comment
        comments.push({ id: photo.id, comment });
      }

      localStorage.setItem("comments", JSON.stringify(comments));
      return true;
    } catch (error) {
      console.error("Error saving comment to localStorage", error);
      return false;
    }
  };

  const removeComment = (photo: GalleryPhoto): boolean => {
    try {
      const comments = getComments();
      const updatedComments = comments.filter((c) => c.id !== photo.id);
      localStorage.setItem("comments", JSON.stringify(updatedComments));
      return true;
    } catch (error) {
      console.error("Error removing comment from localStorage", error);
      return false;
    }
  };

  return { getComments, getCommentByPhoto, saveComment, removeComment };
};
