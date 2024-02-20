import { Image, ScrollView, StyleSheet, View, Pressable } from "react-native";
import { useState } from "react";
import { getMoviesInLibrary } from "../FirebaseFunctions";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import React from "react";

export default function Library({ navigation }) {
  const [movies, setMovies] = useState([]);
  const route = useRoute();
  const { userId } = route.params;
  useFocusEffect(
    React.useCallback(() => {
      const fetchMovies = async () => {
        try {
          const movies = await getMoviesInLibrary(userId);
          setMovies(movies);
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      };

      fetchMovies();
    }, [userId])
  );
  const handlePress = (movieId) => {
    navigation.navigate("Details", { movieID: movieId }); // Navigate to Details screen and pass movieId as parameter
  };
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {movies.map(({ movieId, moviePoster }) => (
          <Pressable key={movieId} onPress={() => handlePress(movieId)}>
            <Image
              key={movieId}
              style={styles.images}
              source={{
                uri: `https://image.tmdb.org/t/p/w500${moviePoster}`,
              }}
            />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center", // Center items horizontally
    alignItems: "center", // Center items vertically
  },
  images: {
    width: 170,
    height: 250,
    marginRight: 10,
    marginBottom: 10,
    resizeMode: "stretch",
    borderRadius: 10,
  },
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});
