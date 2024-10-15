
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
  liked: boolean; // Add liked property to track if post is liked
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
        "https://www.vitri.in/wp-content/uploads/2020/01/Snakeskin-Sansevieria-5-2.jpg",
      likes: 0,
      comments: [],
      liked: false, // Initialize liked as false
    },
    {
      id: "2",
      content: "Money Plants are best for interior decors...",
      image: "https://files.nccih.nih.gov/aloe-vera-steven-foster-square.jpg",
      likes: 0,
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
          <Text style={styles.statNumber}>100</Text>
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

      {/* Modal for Adding a New Post */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Create New Post</Text>
          <TextInput
            style={styles.newPostInput}
            placeholder="What's on your mind?"
            value={newPostContent}
            onChangeText={setNewPostContent}
          />
          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <Text style={styles.imageButtonText}>
              {newPostImage ? "Change Image" : "Select Image"}
            </Text>
          </TouchableOpacity>
          {newPostImage ? (
            <Image
              source={{ uri: newPostImage }}
              style={styles.postImagePreview}
            />
          ) : null}
          <Button title="Submit" onPress={handleAddPost} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#a6d2a2",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  usernameInput: {
    borderBottomWidth: 1,
    width: "100%",
    textAlign: "center",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around", // Adjusted to "space-around" for equal spacing
    width: "100%",
    marginTop: 8,
  },
  editButton: {
    padding: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    flex: 1,
    marginRight: 5, // Added margin for spacing
  },
  editButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  addPostButton: {
    padding: 10,
    backgroundColor: "#2196F3",
    borderRadius: 5,
    flex: 1,
    marginLeft: 5, // Added margin for spacing
  },
  addPostButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  statBox: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 14,
    color: "#888",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  postsList: {
    paddingBottom: 80,
  },
  postContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
    padding: 8,
  },
  postImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  postContent: {
    padding: 8,
  },
  postText: {
    fontSize: 16,
    marginBottom: 8,
  },
  postIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconText: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentSection: {
    marginTop: 8,
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingTop: 8,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    marginBottom: 8,
  },
  commentText: {
    fontSize: 14,
    color: "#555",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 16,
  },
  newPostInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    marginBottom: 16,
  },
  imageButton: {
    padding: 10,
    backgroundColor: "#2196F3",
    borderRadius: 5,
    marginBottom: 16,
  },
  imageButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  postImagePreview: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 16,
  },
});

export default ProfileScreen;
