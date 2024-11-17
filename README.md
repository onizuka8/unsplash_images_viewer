# Unsplash Image Viewer

A React-based web application that uses the Unsplash API to fetch and display images in an interactive grid format.

### [APP LINK](https://unsplash-images-viewr.vercel.app/)

## Features

- **Search for Images**:  
  Users can search for specific images using keywords. If no keyword is provided, the app automatically searches using a random word.

- **View Images**:  
  Browse high-quality images from Unsplash, displayed in an engaging grid layout.

- **Add/Remove Comments**:  
  Users can add or remove comments on individual images for personalization or notes.

- **Favorites Management**:  
  Mark images as favorites and manage them by adding or removing them from a dedicated favorites list.

- **Favorites List View**:  
  View all favorited images in one place for easy access.

## Run Locally

1. Clone the repository:
   ```bash
   git clone
   ```
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Unsplash API access key:

   ```
   VITE_UNSPLASH_API_KEY=YOUR_UNPLASH_ACCESS_KEY
   VITE_ENV=dev
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
