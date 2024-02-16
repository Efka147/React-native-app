import Video from "react-native-video";
import { StyleSheet, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getVideoByID } from "../APIFunctions";

export default function Player({ navigation }) {
  const [videoKey, setVideoKey] = useState(null);
  const route = useRoute();
  const { movieID } = route.params;
  useEffect(() => {
    const fetchKey = async () => {
      try {
        const video = await getVideoByID(movieID);
        setVideoKey(video.key);
      } catch (error) {
        throw error;
      }
    };

    fetchKey();
  }, [movieID]);
  return (
    <View style={styles.container}>
      <Video
        source={{ uri: `https://www.youtube.com/watch?v=${videoKey}` }}
        style={styles.video}
        controls={true}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    flex: 1,
    width: "100%",
  },
});
