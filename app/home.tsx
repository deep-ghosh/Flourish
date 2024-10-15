import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  Linking,
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

  const handleLinkPress = (url: string) => {
    if (url) {
      Linking.openURL(url).catch((err) => {
        console.error("Failed to open the link:", err);
        Alert.alert("Error", "Failed to open the link");
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.welcomeText}>Home</Text>
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
          <Text style={styles.sectionTitle}>Search Results</Text>
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
              // Added these props to improve scroll behavior
              contentContainerStyle={{ paddingBottom: 20 }}
              ListFooterComponent={<View style={{ height: 20 }} />}
            />
          ) : (
            <Text style={styles.noResultsText}>Try to search.</Text>
          )}
        </View>
      )}
    </ScrollView>
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
          backgroundColor: "rgba(76, 175, 80, 0.95)",
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
  container: {
    flex: 1,
    backgroundColor: "#E0E0E0",
    padding: 16,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
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
    marginVertical: 5,
  },
  plantDescription: {
    fontSize: 14,
    color: "#666",
  },
  plantLink: {
    fontSize: 14,
    color: "#1E90FF",
    textDecorationLine: "underline",
  },
  noResultsText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
  },
  resultsList: {
    marginBottom: 20,
  },
});

export default DrawerNavigator;
