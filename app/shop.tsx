import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

const gardenItems = [
  {
    id: "1",
    name: "Cactus",
    image:
      "https://urbano.in/wp-content/uploads/2023/05/types-of-cactus-section.jpg",
  },
  {
    id: "2",
    name: "Rose",
    image:
      "https://bobsbanter.com/wp-content/uploads/2021/11/a-blood-red-rose.jpg",
  },
  {
    id: "3",
    name: "Succulent",
    image:
      "https://www.realsimple.com/thmb/vkvDbxeZH2j62FQuVN0xwIf5mmw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/jade-plant--lucky-plant--money-plant-or-money-tree---crassula-ovata--1129857353-37246f78e9c84f8287c45b251d1c7913.jpg",
  },
  {
    id: "4",
    name: "White Flowers",
    image:
      "https://images.unsplash.com/photo-1500994802273-2dd2df834939?fm=jpg&amp;q=60&amp;w=3000&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2hpdGUlMjBmbG93ZXJzfGVufDB8fDB8fHww",
  },
  { id: "5", name: "Plant Pot", image: "https://example.com/plant_pot.png" },
  { id: "6", name: "Fertilizer", image: "https://example.com/fertilizer.png" },
  // Add more items as needed
];

const ShopScreen: React.FC = () => {
  const renderItem = ({
    item,
  }: {
    item: { id: string; name: string; image: string };
  }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <Text style={styles.itemName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shop Plants</Text>
      <FlatList
        data={gardenItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: "#E8F5E9", // Light greenish background for a garden feel
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4caf50", // Green color for the garden theme
    marginBottom: 10,
    textAlign: "center",
  },
  flatList: {
    justifyContent: "space-between",
  },
  itemContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: "center",
    flex: 1,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default ShopScreen;
