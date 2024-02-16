import { StyleSheet, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getVideoByID } from "../APIFunctions";
import { WebView } from "react-native-webview";

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
      <WebView
        source={{ uri: `https://www.youtube.com/embed/${videoKey}` }}
        style={styles.video}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  video: {
    flex: 0.75,
    width: "100%",
  },
});
