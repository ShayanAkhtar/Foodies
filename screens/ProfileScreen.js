import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const ProfileScreen = ({ navigation }) => {
  const handleLogout = () => {
    signOut(auth).then(() => navigation.replace("Login"));
  };
  const user = auth.currentUser;

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: user.photoURL || "https://www.example.com/default-avatar.png" }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{user.displayName || "Hi Foodie, Welcome"}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
    width: "100%",
    maxWidth: 350,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#FF6F61",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: "100%",
    maxWidth: 350,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
