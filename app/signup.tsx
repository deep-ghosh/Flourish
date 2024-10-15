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
  ImageBackground, // Import ImageBackground
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "expo-router";

interface FormValues {
  username: string;
  email: string;
  password: string;
}

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const [visible, setVisible] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [slideAnim] = useState<Animated.Value>(new Animated.Value(-100));

  const SignUpSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password too short!")
      .required("Password is required"),
  });

  const handleSignUp = (values: FormValues) => {
    if (values.username && values.email && values.password) {
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
          router.push("/login");
        }, 2000);
      });
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/736x/a8/f0/54/a8f054ccfc5b659612a7bc4cea55c016.jpg", // Use the same background
      }}
      style={styles.background} // Background styling
    >
      <View style={styles.container}>
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          validationSchema={SignUpSchema}
          onSubmit={handleSignUp}
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
              <Text style={styles.title}>Sign Up</Text>

              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#1d72c2" // Consistent placeholder color
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
              />
              {errors.username && touched.username && (
                <Text style={styles.errorText}>{errors.username}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#1da0c4" // Consistent placeholder color
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {errors.email && touched.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#1da0c4" // Consistent placeholder color
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
                  { backgroundColor: pressed ? "#0056b3" : "#28a745" }, // Consistent button style
                ]}
                onPress={handleSubmit as () => void}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </Pressable>
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
                🎊 Sign-Up Successful! 🌟{"\n"}
                Welcome to the community, {username}! 🌺
              </Text>
            </Animated.View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

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
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 35,
    marginBottom: 20,
    color: "#ffffff", // White title for visibility on the background
  },
  input: {
    width: "150%", // Extended width for an extra-long input box
    height: 60, // Keep the height consistent
    borderColor: "#ddd", // Light gray border for a clean look
    borderWidth: 1.5, // Thin border for modern design
    borderRadius: 10, // Slightly rounded corners for a sleek look
    marginBottom: 20, // Spacing below the input
    paddingHorizontal: 70, // Spacious padding inside the box
    backgroundColor: "#f9f9f9", // Light background for readability
    fontSize: 20, // Comfortable font size for reading
    color: "#333", // Dark text for contrast
    shadowColor: "#000", // Subtle shadow for depth
    shadowOffset: { width: 0, height: 3}, // Floating effect with shadow
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4, // Depth for Android devices
    alignSelf: "flex-start", // Prevent horizontal centering
  },
  errorText: {
    color: "red",
  },
  button: {
    width: "80%", // Increased width for better accessibility
    height: 58, // Slightly increased height for a bigger touch target
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16, // Slightly larger radius for a softer look
    marginBottom: 25,
    backgroundColor: "#28a745",
    paddingVertical: 10, // Add padding for a comfortable feel
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#ffff",
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContent: {
    width: "80%",
    padding: 25,
    borderRadius: 30,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  successText: {
    fontSize: 18,
    textAlign: "center",
    color: "#4CAF50",
  },
});
export default SignUpPage;
