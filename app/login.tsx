import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  Animated,
  Easing,
  Alert,
  ImageBackground, // Import ImageBackground
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "expo-router";

export default function LoginPage() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [forgotVisible, setForgotVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(-100));
  const [forgotSlideAnim] = useState(new Animated.Value(-100));
  const [username, setUsername] = useState<string>("");

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().min(8, "Password too short!").required("Required"),
  });

  const handleLogin = (values: { username: string; password: string }) => {
    if (values.username && values.password) {
      setUsername(values.username);
      setVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          setVisible(false);
          router.push("/home");
        }, 2000);
      });
    }
  };

  const handleForgotPassword = () => {
    setForgotVisible(true);
    Animated.timing(forgotSlideAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        setForgotVisible(false);
      }, 3000);
    });
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/736x/a8/f0/54/a8f054ccfc5b659612a7bc4cea55c016.jpg",
      }}
      style={styles.background} // Set the styles for the background
    >
      <View style={styles.container}>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <Text style={styles.title}>Login</Text>

              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#1d72c2" // Change placeholder color for visibility
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
              />
              {errors.username && touched.username && (
                <Text style={styles.errorText}>{errors.username}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#1da0c4" // Change placeholder color for visibility
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry
              />
              {errors.password && touched.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  { backgroundColor: pressed ? "#0056b3" : "#28a745" },
                ]}
                onPress={handleSubmit as () => void}
              >
                <Text style={styles.buttonText}>Login</Text>
              </Pressable>

              <Pressable onPress={handleForgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </Pressable>

              <View style={styles.signUpContainer}>
                <Text style={styles.signUpPrompt}>Don't have an account?</Text>
                <Pressable onPress={handleSignUp}>
                  <Text style={styles.signUpText}>Sign up</Text>
                </Pressable>
              </View>
            </>
          )}
        </Formik>

        {/* Success Modal */}
        <Modal transparent visible={visible} animationType="none">
          <View style={styles.modalOverlay}>
            <Animated.View
              style={[
                styles.modalContent,
                { transform: [{ translateY: slideAnim }] },
              ]}
            >
              <Text style={styles.successText}>
                🎉 Login Successful! 🌿
                {"\n"}
                Welcome back, {username}! 🌸
              </Text>
            </Animated.View>
          </View>
        </Modal>

        {/* Forgot Password Modal */}
        <Modal transparent visible={forgotVisible} animationType="none">
          <View style={styles.modalOverlay}>
            <Animated.View
              style={[
                styles.forgotModalContent,
                { transform: [{ translateY: forgotSlideAnim }] },
              ]}
            >
              <Text style={styles.forgotText}>
                ✉️ Password Reset Requested! 🌟
                {"\n"}
                Check your email for instructions. 🔄
              </Text>
            </Animated.View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    // Removed the overlay style for better background visibility
  },
  title: {
    fontSize: 35,
    marginBottom: 20,
    color: "#e1e0e0", // Change title color for better visibility
  },
  input: {
    width: "120%", 
    height: 60, 
    borderColor: "#ddd", 
    borderWidth: 1.5, 
    borderRadius: 10, 
    marginBottom: 20, 
    paddingHorizontal: 80, 
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    color: "#333", 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 3 }, 
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4, 
  },


  errorText: {
    color: "red",
    fontSize: 14, // Adjusted font size
    marginTop: -15, // Align error message closer to input
    marginBottom: 10,
  },

  button: {
    width: "65%", // Matches input width for consistency
    height: 60, // Increased for a bigger touch target
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16, // Larger radius for modern look
    marginBottom: 20,
    backgroundColor: "#218838", // Darker green for a strong CTA
    paddingVertical: 15,
    paddingHorizontal: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5, // Enhance shadow for depth
  },

  buttonText: {
    color: "#fff",
    fontSize: 18, // Larger text for better readability
    fontWeight: "bold",
  },

  forgotPasswordText: {
    color: "#3ecb25",
    marginBottom: 20,
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  signUpPrompt: {
    color: "#ffffff", // Color for prompt text
  },
  signUpText: {
    color: "#53ca32",
    marginLeft: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  forgotModalContent: {
    width: "80%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "center",
  },
  successText: {
    fontSize: 18,
    textAlign: "center",
    color: "#4CAF50",
  },
  forgotText: {
    fontSize: 18,
    textAlign: "center",
    color: "#FFA500",
  },
});
