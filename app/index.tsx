
import React from "react";
import { useRouter } from "expo-router"; // Use expo-router's useRouter
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";

const Loading: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.pageStyle}>
      <Image
        source={{
          uri: "https://www.fubiz.net/wp-content/uploads/2019/11/LOVELY-QUARANTINE-1.jpg",
        }}
        style={styles.backgroundImage}
      />
      <View style={styles.containerStyle}>
        <Text style={styles.titleText}>Welcome to the Flourish</Text>
        <View style={styles.buttonContainerStyle}>
          <TouchableOpacity
            style={styles.loginButtonStyle}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signupButtonStyle}
            onPress={() => router.push("/signup")}
          >
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.subscribeButtonStyle}
            onPress={() => router.push("/home")}
          >
            <Text style={styles.buttonText}>Subscribe</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.flowerIconsStyle}>
          <Image
            source={{
              uri: "https://nestasia.in/cdn/shop/products/M21nsa6352.jpg?v=1653909457",
            }}
            style={styles.flowerIconStyle}
          />
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_ewTTA1TdeVIf88dJ3b5twIxbVyqpX_HqoQ&s",
            }}
            style={styles.flowerIconStyle}
          />
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFOq2JAQDLjOz0AqcLCd6xEZEMgFqez73BUA&s",
            }}
            style={styles.flowerIconStyle}
          />
          <Image
            source={{
              uri: "https://static.wixstatic.com/media/a9f3b9_c7b04ba09aad40c683d3155cbf820689~mv2.png/v1/fill/w_536,h_718,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/a9f3b9_c7b04ba09aad40c683d3155cbf820689~mv2.png",
            }}
            style={styles.flowerIconStyle}
          />
        </View>
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
    opacity: 0.5, // Make the background image a bit transparent
  },
  containerStyle: {
    flexDirection: "column",
    alignItems: "center",
    zIndex: 1, // Ensure buttons are on top of the background
    padding: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  buttonContainerStyle: {
    marginTop: 20,
  },
  buttonText: {
    color: "#fff", // Text color for buttons
    fontSize: 18,
    textAlign: "center",
  },
  loginButtonStyle: {
    width: 150,
    padding: 10,
    margin: 10,
    backgroundColor: "#c69f8f",
    borderRadius: 8,
    alignItems: "center",
  },
  signupButtonStyle: {
    width: 150,
    padding: 10,
    margin: 10,
    backgroundColor: "#4b3a2b",
    borderRadius: 8,
    alignItems: "center",
  },
  subscribeButtonStyle: {
    width: 150,
    padding: 10,
    margin: 10,
    backgroundColor: "#e8d1c0",
    borderRadius: 8,
    alignItems: "center",
  },
  flowerIconsStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
  },
  flowerIconStyle: {
    width: 50,
    height: 50, // Customize the icon size
  },
});

export default Loading;
