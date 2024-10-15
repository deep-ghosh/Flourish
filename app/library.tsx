import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient"; // Add this import

import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";

const plants = [
  {
    id: "1",
    name: "Cactus",
    description:
      "A hardy plant that needs minimal water. Cacti thrive in dry environments and are known for their spines.",
    fullDetails:
      "Cacti are great for beginners. They require well-drained soil and very little water. Their ability to store water makes them ideal for hot climates.",
    image:
      "https://www.thespruce.com/thmb/VUagQ74YMrGsKPATAIT3IPMxta0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/difference-between-cacti-and-succulents-3976741-hero-fdb0b4d4197a4796b86dbdf39ebf026a.jpg",
  },
  {
    id: "2",
    name: "Red Cactus",
    description:
      "A vibrant cactus with a touch of red. Perfect for adding color to your garden.",
    fullDetails:
      "The Red Cactus is a variety that combines the resilience of cacti with an attractive red hue. They are drought-tolerant and easy to maintain.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdjplZPyphSmthl3ZnlDuqasbmQHqgKazuGfgWfQasrpkduODYxBJ1kQfp0824uKjHmI4&usqp=CAU",
  },
  {
    id: "3",
    name: "Aloe Vera",
    description: "Known for its medicinal properties and soothing gel.",
    fullDetails:
      "Aloe Vera is not only ornamental but also functional. Its gel is used to treat burns and skin irritations. It thrives in sunlight and requires minimal watering.",
    image: "https://files.nccih.nih.gov/aloe-vera-steven-foster-square.jpg",
  },
  {
    id: "4",
    name: "Snake Plant",
    description: "A resilient plant that can thrive in low light.",
    fullDetails:
      "Snake plants are perfect for indoor environments. They require little care and can improve air quality by filtering toxins.",
    image:
      "https://www.vitri.in/wp-content/uploads/2020/01/Snakeskin-Sansevieria-5-2.jpg",
  },
  {
    id: "5",
    name: "Peace Lily",
    description: "A beautiful plant known for its air-purifying properties.",
    fullDetails:
      "Peace Lilies are easy to care for and are great for improving indoor air quality. They need regular watering but prefer low light.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo6AuEwlb-R1_lF8EcrZFCxIJn1umibaTq8xIXHkyWm5C8BYpdUzFdtH3SxQX5wlTM64I&amp;usqp=CAU",
  },
  {
    id: "6",
    name: "Bamboo Palm",
    description: "A tropical plant that brings a lush, green look indoors.",
    fullDetails:
      "The Bamboo Palm adds a tropical vibe to any space. It thrives in indirect sunlight and requires regular watering to maintain its vibrant look.",
    image:
      "https://myfreshair.in/wp-content/uploads/2021/07/bamboo-palm-plant-01-2.jpg",
  },
];

const LibraryScreen: React.FC = () => {
  const [selectedPlant, setSelectedPlant] = useState<any>(null);

  const renderPlant = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => setSelectedPlant(item)}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Garden Library</Text>
      <FlatList
        data={plants}
        renderItem={renderPlant}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      {selectedPlant && (
        <Modal
          visible={!!selectedPlant}
          transparent={true}
          onRequestClose={() => setSelectedPlant(null)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ScrollView>
                <Image
                  source={{ uri: selectedPlant.image }}
                  style={styles.modalImage}
                />
                <Text style={styles.modalName}>{selectedPlant.name}</Text>
                <Text style={styles.modalDescription}>
                  {selectedPlant.fullDetails}
                </Text>
                <TouchableOpacity
                  onPress={() => setSelectedPlant(null)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5eaf64", 
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#020602", // Garden green
    marginBottom: 20,
    textAlign: "center",
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#000000b2",
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#86dc61",
  },
  description: {
    fontSize: 14,
    color: "#ffffff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(88, 210, 172, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#000000ff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#228B22",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: "#ddd2d2",
    marginBottom: 20,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#46a949",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeText: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default LibraryScreen;
