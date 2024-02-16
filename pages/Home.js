import { Button, StyleSheet, Text, View } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Internship excercise</Text>
      <Button title="Browse" onPress={() => navigation.navigate("Browse")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
