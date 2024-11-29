import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in both email and password");
      return;
    }

    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoading(false);
        navigation.navigate("Login");
      })
      .catch((error) => {
        setLoading(false);
        if (error.code === "auth/invalid-email") {
          Alert.alert("Error", "Invalid email format. Please enter a valid email.");
        } else if (error.code === "auth/email-already-in-use") {
          Alert.alert("Error", "This email is already in use.");
        } else if (error.code === "auth/weak-password") {
          Alert.alert("Error", "Password is too weak. Please choose a stronger password.");
        } else {
          Alert.alert("Error", "Something went wrong. Please try again.");
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f4f4f9",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 40,
    color: "#2d2d2d",
    textAlign: "center",
    letterSpacing: 2,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#dcdcdc",
    borderRadius: 10,
    paddingLeft: 20,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  buttonContainer: {
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#FF6F61",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 16,
    color: "#6c757d",
  },
  loginLink: {
    fontSize: 16,
    color: "#FF6F61",
    fontWeight: "600",
  },
});

export default SignupScreen;
