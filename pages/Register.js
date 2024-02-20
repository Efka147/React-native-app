import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import { FirebaseAuth } from "../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = FirebaseAuth;
  const showAlert = (title, message) => {
    Alert.alert(
      `${title}`,
      `${message}`,
      [
        {
          text: "OK",
          onPress: () => {
            console.log("OK Pressed");
          },
        },
      ],
      { cancelable: true }
    );
  };
  const handleRegister = () => {
    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Registered successfully
          const user = userCredential.user;
          console.log("User registered:", user.uid);
          navigation.navigate("Home");
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            showAlert("Invalid email", "Email is already in use");
          } else if (error.code === "auth/weak-password") {
            showAlert(
              "Invalid password",
              "Password should be at least 6 characters long"
            );
          } else {
            console.log(error);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
