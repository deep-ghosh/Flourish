import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const ProfileScreen: React.FC = () => {
  const [profileImage, setProfileImage] = useState(
    "https://e1.pxfuel.com/desktop-wallpaper/78/626/desktop-wallpaper-ayanokouji-kiyotaka-kiyotaka-ayanokouji.jpg"
  );
  const [username, setUsername] = useState("Kiyotaka Ayanokoji");
  const [isEditing, setIsEditing] = useState(false);

  const changeProfilePicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri); // Access image from result.assets[0].uri
    } else {
      Alert.alert("Image selection canceled.");
    }
  };

  const posts = [
    {
      id: "1",
      content: "Made a new addition to my garden!",
      image:
        "https://www.vitri.in/wp-content/uploads/2020/01/Snakeskin-Sansevieria-5-2.jpg",
    },
    {
      id: "2",
      content: "Money Plants are best for interior decors...",
      image: "https://files.nccih.nih.gov/aloe-vera-steven-foster-square.jpg",
    },
  ];

  const renderPost = ({ item }: { item: any }) => (
    <View style={styles.postContainer}>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <View style={styles.postContent}>
        <Text style={styles.postText}>{item.content}</Text>
        <View style={styles.postIcons}>
          <FontAwesome name="envelope" size={20} color="gray" />
          <FontAwesome
            name="heart"
            size={20}
            color="gray"
            style={styles.iconSpacing}
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.profileContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={changeProfilePicture}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        </TouchableOpacity>

        {isEditing ? (
          <TextInput
            style={styles.usernameInput}
            value={username}
            onChangeText={setUsername}
            onSubmitEditing={() => setIsEditing(false)}
            autoFocus
            onBlur={() => setIsEditing(false)}
          />
        ) : (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Text style={styles.profileName}>{username}</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditing(!isEditing)}
        >
          <Text style={styles.editButtonText}>
            {isEditing ? "Save" : "Edit Profile"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>280</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>80</Text>
          <Text style={styles.statLabel}>Achievements</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Posts</Text>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.postsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#A9CBB7",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  usernameInput: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  editButton: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#4caf50",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  statBox: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  statLabel: {
    color: "gray",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
    marginVertical: 10,
  },
  postsList: {
    paddingHorizontal: 20,
  },
  postContainer: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 1,
  },
  postImage: {
    width: "100%",
    height: 200,
  },
  postContent: {
    padding: 10,
  },
  postText: {
    fontSize: 16,
    marginBottom: 10,
  },
  postIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconSpacing: {
    marginLeft: 20,
  },
});

export default ProfileScreen;
