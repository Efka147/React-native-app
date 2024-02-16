import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
} from "react-native";

import {
  getMostPopularMoviesInCurrentYear,
  getTrendingThisWeek,
  getUpcommingMovies,
} from "../APIFunctions.js";
import { useEffect, useState } from "react";

export default function Browse({ navigation }) {
  const [upcommingMovies, setUpcommingMovies] = useState([]);
  const [mostPopular, setMostPopular] = useState([]);
  const [trendingThisWeek, setTrendingThisWeek] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const upcomming = await getUpcommingMovies();
        setUpcommingMovies(upcomming);
        const popular = await getMostPopularMoviesInCurrentYear();
        setMostPopular(popular);
        const trending = await getTrendingThisWeek();
        setTrendingThisWeek(trending);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handlePress = (movieId) => {
    navigation.navigate("Details", { movieID: movieId }); // Navigate to Details screen and pass movieId as parameter
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.headers}>Upcoming Movies</Text>
        <ScrollView horizontal>
          {upcommingMovies.map((movie) => (
            <Pressable key={movie.id} onPress={() => handlePress(movie.id)}>
              <Image
                key={movie.id}
                style={styles.images}
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }}
              />
            </Pressable>
          ))}
        </ScrollView>
        <Text style={styles.headers}>Most Popular This Year</Text>
        <ScrollView horizontal>
          {mostPopular.map((movie) => (
            <Pressable key={movie.id} onPress={() => handlePress(movie.id)}>
              <Image
                key={movie.id}
                style={styles.images}
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }}
              />
            </Pressable>
          ))}
        </ScrollView>
        <Text style={styles.headers}>Trending This Week</Text>
        <ScrollView horizontal>
          {trendingThisWeek.map((movie) => (
            <Pressable key={movie.id} onPress={() => handlePress(movie.id)}>
              <Image
                key={movie.id}
                style={styles.images}
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }}
              />
            </Pressable>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  images: {
    width: 170,
    height: 250,
    marginRight: 15,
    resizeMode: "stretch",
  },
  lists: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  headers: {
    fontSize: 24, // Adjust the font size as needed
    fontWeight: "bold", // Make the text bold
    color: "#333", // Set the text color
    marginTop: 20, // Add some top margin to separate it from other content
    marginBottom: 10, // Add some bottom margin for spacing
    marginLeft: 20,
    textAlign: "left",
  },
});
