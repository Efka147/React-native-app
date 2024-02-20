const apikey = "dcfb4435522208beea6b7c34549da397";

export const getUpcommingMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=2025&sort_by=popularity.desc&api_key=${apikey}`
    );
    if (response.ok) {
      const data = await response.json();
      return data.results;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMostPopularMoviesInCurrentYear = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=2024&sort_by=popularity.desc&api_key=${apikey}`
    );
    if (response.ok) {
      const data = await response.json();
      return data.results;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTrendingThisWeek = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?language=en-US&api_key=${apikey}`
    );
    if (response.ok) {
      const data = await response.json();
      return data.results;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMovieDetailsByID = async (movieId) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=${apikey}`
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getSimilarMoviesByID = async (movieId) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1&api_key=${apikey}`
    );
    if (response.ok) {
      const data = await response.json();
      return data.results;
    } else {
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getVideoByID = async (movieId) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US&api_key=${apikey}`
    );
    if (response.ok) {
      const data = await response.json();
      return data.results[0];
    } else {
      throw error;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
