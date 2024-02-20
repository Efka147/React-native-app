import { FirebaseDb } from "./FirebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

export const addToLibrary = async (userId, movieId, moviePoster) => {
  try {
    const userLibraryRef = collection(FirebaseDb, "library", userId, "added");

    await addDoc(userLibraryRef, { movieId, moviePoster });

    console.log("Movie added to library successfully");
  } catch (error) {
    console.error("Error adding movie to library:", error.message);
  }
};
export const IsAddedToLibrary = async (userId, movieId) => {
  try {
    const userLibraryRef = collection(FirebaseDb, "library", userId, "added");
    const movieQuery = query(userLibraryRef, where("movieId", "==", movieId));
    const querySnapshot = await getDocs(movieQuery);
    if (querySnapshot.empty) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
    console.error(error.message);
  }
};
export const removeFromLibrary = async (userId, movieId) => {
  try {
    const userLibraryDocRef = collection(
      FirebaseDb,
      "library",
      userId,
      "added"
    );
    const q = query(userLibraryDocRef, where("movieId", "==", movieId));
    const querySnapshot = await getDocs(q);
    // Iterate over the query results
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });

    console.log("Movie removed from library successfully");
  } catch (error) {
    console.error("Error removing movie from library:", error.message);
  }
};

export const getMoviesInLibrary = async (userId) => {
  try {
    const moviesCollection = collection(FirebaseDb, "library", userId, "added");
    const querySnapshot = await getDocs(moviesCollection);

    const movies = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      // Extract movie ID and poster from each document
      const { movieId, moviePoster } = doc.data();

      // Push the movie ID and poster to the array
      movies.push({ movieId, moviePoster });
    });
    movies.forEach((movie) => {
      console.log(movie.movieId);
    });
    return movies;
  } catch (error) {
    console.error("Error getting movies:", error.message);
    return [];
  }
};
