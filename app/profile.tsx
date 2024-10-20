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
  Modal,
  Button,
  ImageBackground,
  ImageSourcePropType,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

// Define the Post type
interface Post {
  id: string;
  content: string;
  image: string;
  likes: number;
  comments: string[];
  liked: boolean; // Track if post is liked
}

const ProfileScreen: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string>(
    "https://e1.pxfuel.com/desktop-wallpaper/78/626/desktop-wallpaper-ayanokouji-kiyotaka-kiyotaka-ayanokouji.jpg"
  );
  const [username, setUsername] = useState<string>("Kiyotaka Ayanokoji");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      content: "Made a new addition to my garden!",
      image:
        "https://i.pinimg.com/736x/02/ff/5d/02ff5da1d558cf884aad7f63870b8422.jpg",
      likes: 2546,
      comments: [],
      liked: false, // Initialize liked as false
    },
    {
      id: "2",
      content: "Love how my study looks right now !",
      image:
        "https://i.pinimg.com/736x/33/ad/07/33ad07e0a4578cbb2889e1f1fb24b812.jpg",
      likes: 1532,
      comments: [],
      liked: false, // Initialize liked as false
    },
    {
      id: "3",
      content: "It's a garden inside a garden!🍄🍂",
      image:
        "https://i.pinimg.com/736x/6b/0b/88/6b0b88bdde01290ff533c037d21560ec.jpg",
      likes: 521,
      comments: [],
      liked: false, // Initialize liked as false
    },
    {
      id: "4",
      content: "Peace Lilies are best for interior decors...",
      image:
        "https://i.pinimg.com/736x/45/52/1e/45521eba451ded89f7ddf94470ef4122.jpg",
      likes: 454,
      comments: [],
      liked: false, // Initialize liked as false
    },
    {
      id: "5",
      content: "Bonsai plants heal hearts❤",
      image:
        "https://i.pinimg.com/736x/4d/00/e7/4d00e763992ade1b6e85d3fa1257df25.jpg",
      likes: 2314,
      comments: [],
      liked: false, // Initialize liked as false
    },
  ]);

  const [newPostContent, setNewPostContent] = useState<string>("");
  const [newPostImage, setNewPostImage] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [commentInput, setCommentInput] = useState<string>("");
  const [visibleComments, setVisibleComments] = useState<Set<string>>(
    new Set()
  );

  const changeProfilePicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    } else {
      Alert.alert("Image selection canceled.");
    }
  };

  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.postContainer}>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <View style={styles.postContent}>
        <Text style={styles.postText}>{item.content}</Text>
        <View style={styles.postIcons}>
          <TouchableOpacity onPress={() => handleLike(item.id)}>
            <Text style={styles.iconText}>
              <FontAwesome
                name="heart"
                size={20}
                color={item.liked ? "red" : "gray"} // Change color based on liked state
              />{" "}
              {item.likes}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleComments(item.id)}>
            <Text style={styles.iconText}>
              <FontAwesome name="comment" size={20} color="gray" />
            </Text>
          </TouchableOpacity>
        </View>

        {/* Comment Section */}
        {visibleComments.has(item.id) && (
          <View style={styles.commentSection}>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              value={commentInput}
              onChangeText={setCommentInput}
              onSubmitEditing={() => handleAddComment(item.id)}
              returnKeyType="done"
            />
            {item.comments.map((comment, index) => (
              <Text key={index} style={styles.commentText}>
                {comment}
              </Text>
            ))}
          </View>
        )}
      </View>
    </View>
  );

  const handleAddPost = () => {
    if (newPostContent.trim()) {
      const newPost: Post = {
        id: (posts.length + 1).toString(),
        content: newPostContent,
        image: newPostImage || "https://via.placeholder.com/150",
        likes: 0,
        comments: [],
        liked: false, // Initialize liked as false for new posts
      };
      setPosts([newPost, ...posts]);
      setNewPostContent("");
      setNewPostImage("");
      setModalVisible(false);
      Alert.alert("Post added successfully!");
    } else {
      Alert.alert("Please enter some content for the post.");
    }
  };

  const handleLike = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const newLikes = post.liked ? post.likes - 1 : post.likes + 1;
          return { ...post, likes: newLikes, liked: !post.liked }; // Toggle liked state
        }
        return post;
      })
    );
  };

  const toggleComments = (postId: string) => {
    setVisibleComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
    setCommentInput(""); // Reset comment input when toggling comments
  };

  const handleAddComment = (postId: string) => {
    if (commentInput.trim()) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: [...post.comments, commentInput],
              }
            : post
        )
      );
      setCommentInput(""); // Clear input after adding comment
      Alert.alert("Comment added successfully!");
    } else {
      Alert.alert("Please enter a comment.");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setNewPostImage(result.assets[0].uri);
    } else {
      Alert.alert("Image selection canceled.");
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/736x/90/4a/f8/904af8185a39a2569a546017d73ab2f4.jpg",
      }}
      style={styles.profileContainer}
    >
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

        {/* Update: Align buttons closer together */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(!isEditing)}
          >
            <Text style={styles.editButtonText}>
              {isEditing ? "Save" : "Edit Profile"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addPostButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addPostButtonText}>Add Post</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>2k</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>345</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        contentContainerStyle={styles.postsContainer}
      />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add a New Post</Text>
          <TextInput
            style={styles.postInput}
            placeholder="Write something..."
            value={newPostContent}
            onChangeText={setNewPostContent}
          />
          <TouchableOpacity style={styles.pickImageButton} onPress={pickImage}>
            <Text style={styles.pickImageText}>Pick an Image</Text>
          </TouchableOpacity>
          <Button title="Post" onPress={handleAddPost} />
          <Button
            title="Cancel"
            color="red"
            onPress={() => setModalVisible(false)}
          />
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
    alignItems: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#fff",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "#000000",
  },
  usernameInput: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  editButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addPostButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  addPostButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: "100%",
  },
  statBox: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2a2020",
  },
  statLabel: {
    fontSize: 14,
    color: "#000000",
  },
  postsContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  postContainer: {
    backgroundColor: "#a4c18ed8",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  postContent: {
    marginTop: 10,
  },
  postText: {
    fontSize: 16,
    color: "#333",
  },
  postIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  iconText: {
    fontSize: 16,
    color: "#333",
  },
  commentSection: {
    marginTop: 10,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 5,
    padding: 8,
    marginTop: 10,
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
    marginTop: 5,
    color: "#000000",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  postInput: {
    height: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  pickImageButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  pickImageText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProfileScreen;
