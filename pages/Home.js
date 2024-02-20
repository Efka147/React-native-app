import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import logo from "../assets/movieLogo.jpg";
import { useEffect, useState } from "react";
import { FirebaseAuth } from "../FirebaseConfig";
export default function Home({ navigation }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = FirebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        setUserId(user.uid);
      } else {
        setLoggedIn(false);
        setUserId(null);
      }
    });
    return unsubscribe;
  }, []);
  const handleLogout = () => {
    FirebaseAuth.signOut()
      .then(() => {
        setLoggedIn(false);
        setUserId(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleLibrary = () => {
    navigation.navigate("Library", { userId: userId });
  };
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.centeredContent}>
        <Text style={styles.title}>Internship excercise</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Browse")}
        >
          <Text style={styles.buttonText}>Browse</Text>
        </TouchableOpacity>
        {loggedIn ? (
          <>
            <TouchableOpacity style={styles.button} onPress={handleLibrary}>
              <Text style={styles.buttonText}>My Library</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Text>Dont have an account yet?</Text>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logo: {
    width: "30%",
    height: "30%",
    resizeMode: "contain",
  },
  logoContainer: {
    alignItems: "center",
    paddingTop: 50, // Adjust as needed
  },
  centeredContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
