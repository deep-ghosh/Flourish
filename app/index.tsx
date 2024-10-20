import React from "react";
import { useRouter } from "expo-router"; // Use expo-router's useRouter
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";

const Loading: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.pageStyle}>
      <Image
        source={{
          uri: "https://i.pinimg.com/736x/31/1f/26/311f26617cf8a43998442e309f3dcf94.jpg",
        }}
        style={styles.backgroundImage}
      />
      <Text style={styles.titleText}>Welcome to Flourish 🍁</Text>
      <View style={styles.buttonContainerStyle}>
        <TouchableOpacity
          style={styles.loginButtonStyle}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.buttonText}>Login ↩</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signupButtonStyle}
          onPress={() => router.push("/signup")}
        >
          <Text style={styles.buttonText}> ↪ Signup </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  titleText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4a4a4a", // Darker color for better contrast
    marginBottom: 20,
    textAlign: "center",
    textShadowColor: "#ffffff", // Light shadow for better readability
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  buttonContainerStyle: {
    marginTop: 20,
    flexDirection: "row", // Align buttons horizontally
    justifyContent: "space-between", // Space out buttons
    width: "80%", // Limit width for better spacing
  },
  buttonText: {
    color: "#ffffff", // Text color for buttons
    fontSize: 18,
    textAlign: "center",
  },
  loginButtonStyle: {
    flex: 1,
    padding: 15,
    margin: 10,
    backgroundColor: "#4caf50", // Green color for login button
    borderRadius: 30, // Rounded edges
    alignItems: "center",
    justifyContent: "center",
  },
  signupButtonStyle: {
    flex: 1,
    padding: 15,
    margin: 10,
    backgroundColor: "#2196F3", // Blue color for signup button
    borderRadius: 30, // Rounded edges
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Loading;
