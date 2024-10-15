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
  const [username, setUsername] = useState<string>(""); // Add state to store username

  // Define validation schema for username and password
  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().min(8, "Password too short!").required("Required"),
  });

  const handleLogin = (values: { username: string; password: string }) => {
    if (values.username && values.password) {
      setUsername(values.username); // Store the username
      // Trigger the modal and animation
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
                { backgroundColor: pressed ? "#0056b3" : "#28a745" }, // Green color
              ]}
              onPress={handleSubmit as () => void}
            >
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>

            <Pressable onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </Pressable>

            <View style={styles.signUpContainer}>
              <Text>Don't have an account?</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  errorText: {
    color: "red",
  },
  button: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#28a745", // Green color
  },
  buttonText: {
    color: "#ffff",
    fontSize: 18,
  },
  forgotPasswordText: {
    color: "#007BFF",
    marginBottom: 20,
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  signUpText: {
    color: "#007BFF",
    marginLeft: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)", // Slightly darkened background for the modal
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
    color: "#FFA500", // Orange color for the forgot password message
  },
});
