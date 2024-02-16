import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { getMovieDetailsByID, getSimilarMoviesByID } from "../APIFunctions";

export default function Details({ navigation }) {
  const [movieDetails, setMovieDetails] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const route = useRoute();
  const { movieID } = route.params;
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await getMovieDetailsByID(movieID);
        setMovieDetails(details);
        const similar = await getSimilarMoviesByID(movieID);
        setSimilarMovies(similar);
      } catch (error) {
        throw error;
      }
    };

    fetchDetails();
  }, [movieID]);

  const handlePress = (movieId) => {
    navigation.navigate("Details", { movieID: movieId });
  };
  const handlePressTrailer = () => {
    navigation.navigate("Player", { movieID: movieID });
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image
          key={movieID}
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`,
          }}
        />
        <Text style={styles.headers}>Movie Details</Text>
        <Text style={styles.description}> {movieDetails.overview}</Text>
        <Button
          onPress={handlePressTrailer}
          title="Play Trailer"
          color="#841584"
        />
        <Text style={styles.headers}>Similar Movies</Text>
        <ScrollView horizontal>
          {similarMovies.map((movie) => (
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  image: {
    width: "90%",
    aspectRatio: 16 / 20,

    paddingTop: 15,
  },

  headers: {
    fontSize: 24, // Adjust the font size as needed
    fontWeight: "bold", // Make the text bold
    color: "#333", // Set the text color
    marginTop: 10, // Add some top margin to separate it from other content
    marginBottom: 10, // Add some bottom margin for spacing
    marginLeft: 5,
    textAlign: "left",
  },
  description: {
    fontSize: 18,
    lineHeight: 24,
    color: "#333", // Adjust the color as needed
    textAlign: "left",
    marginHorizontal: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "left",
    justifyContent: "left",
    flexDirection: "column",
    paddingTop: 15,
  },
  images: {
    width: 170,
    height: 250,
    marginRight: 15,
    resizeMode: "stretch",
  },
});
