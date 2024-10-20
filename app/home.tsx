
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  Linking,
  FlatList,
  ScrollView,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { FontAwesome } from "@expo/vector-icons";
import Task from "./task";
import LibraryScreen from "./library";
import ShopScreen from "./shop";
import ProfileScreen from "./profile";
import { useNavigation } from "@react-navigation/native";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Video } from "expo-av";


const Drawer = createDrawerNavigator();
const API_KEY = "AIzaSyCgAo3UztuXJI1GaoJzbMMn_-y0k9E-sQg";
const genAI = new GoogleGenerativeAI(API_KEY);

const HomeScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const chat = model.startChat();
      const result = await chat.sendMessage(
        `Search for plants: ${searchQuery}`
      );
      const response = result.response;

      if (response) {
        const text = await response.text();
        const plants = text.split("\n\n").map((section, index) => {
          const lines = section.split("\n");
          const name = lines[0].trim();
          const description = lines.slice(1).join(" ").trim();
          const linkMatch = description.match(/\bhttps?:\/\/\S+/gi);
          const link = linkMatch ? linkMatch[0] : null;

          return {
            id: index.toString(),
            name,
            description: link
              ? description.replace(link, "").trim()
              : description,
            link,
          };
        });
        setSearchResults(plants);
      }
    } catch (error) {
      console.error("Error fetching data from Gemini AI:", error);
      Alert.alert("Error", "Failed to fetch search results");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setSearchResults([]);
    if (searchQuery) {
      handleSearch();
    }
  };

  const handleLinkPress = (url: string) => {
    if (url) {
      Linking.openURL(url).catch((err) => {
        console.error("Failed to open the link:", err);
        Alert.alert("Error", "Failed to open the link");
      });
    }
  };

  return (
    <View style={styles.pageStyle}>
      <Image
        source={{
          uri: "https://i.pinimg.com/736x/11/62/6d/11626dbdb2ebe5b92f2d201bd28ccf21.jpg",
        }}
        style={styles.backgroundImage}
      />
      <ScrollView style={styles.container}>
        <Text style={styles.welcomeText}></Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for plants..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#4caf50" />
        ) : (
          <View style={styles.resultsList}>
            <View style={styles.resultsHeader}>
              <Text style={styles.sectionTitle}>Search Results</Text>
              <TouchableOpacity onPress={handleRefresh}>
                <FontAwesome name="refresh" size={24} color="#4caf50" />
              </TouchableOpacity>
            </View>
            {searchResults.length > 0 ? (
              <FlatList
                data={searchResults}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleLinkPress(item.link)}
                    disabled={!item.link}
                    style={[
                      styles.plantCard,
                      !item.link && { backgroundColor: "#f0f0f0" },
                    ]}
                  >
                    <Text style={styles.plantName}>{item.name}</Text>
                    <Text style={styles.plantDescription}>
                      {item.description}
                    </Text>
                    {item.link && (
                      <Text style={styles.plantLink}>
                        {item.link ? "Learn more" : ""}
                      </Text>
                    )}
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 20 }}
              />
            ) : (
              <Text style={styles.noResultsText}>Try to search.</Text>
            )}
          </View>
        )}
        <View style={styles.videoContainer}>
          <Video
            source={require("../assets/hv.mp4")}
            rate={1.0}
            volume={0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            isLooping
            useNativeControls={true}
            style={styles.video}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const DrawerNavigator: React.FC = () => {
  const navigation = useNavigation();
  const profileImage =
    "https://e1.pxfuel.com/desktop-wallpaper/78/626/desktop-wallpaper-ayanokouji-kiyotaka-kiyotaka-ayanokouji.jpg";

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          width: 240,
        },
        headerStyle: {
          backgroundColor: "rgba(12, 102, 23, 0.95)",
          elevation: 0,
        },
        headerTintColor: "#fff",
        drawerActiveTintColor: "#4caf50",
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: {
          fontSize: 16,
        },
        drawerItemStyle: {
          marginVertical: 20,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          drawerIcon: () => <FontAwesome name="home" size={35} />,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile" as never)}
            >
              <Image
                source={{ uri: profileImage }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 15,
                  marginRight: 10,
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Drawer.Screen
        name="Task"
        component={Task}
        options={{
          title: "Tasks",
          drawerIcon: () => <FontAwesome name="list" size={30} />,
        }}
      />
      <Drawer.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          title: "Library",
          drawerIcon: () => <FontAwesome name="book" size={30} />,
        }}
      />
      <Drawer.Screen
        name="Shop"
        component={ShopScreen}
        options={{
          title: "Shop",
          drawerIcon: () => <FontAwesome name="shopping-cart" size={30} />,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          drawerIcon: () => <FontAwesome name="user-circle" size={30} />,
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  pageStyle: {
    flex: 1,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#e9ef4af3",
    marginBottom: 10,
  },
  searchBar: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
  },
  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  plantCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  plantName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  plantDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  plantLink: {
    fontSize: 14,
    color: "#4caf50",
    textDecorationLine: "underline",
  },
  noResultsText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  videoContainer: {
    marginTop: 20,
  },
  video: {
    width: "100%",
    height: 200,
  },
});

export default DrawerNavigator;
