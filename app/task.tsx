import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  TextInput,
  ImageBackground, // Added for background image
} from "react-native";

// Sample data for the tasks
const initialTasks = [
  { id: "1", title: "Water the plants", completed: false },
  { id: "2", title: "Make organic paste", completed: false },
  { id: "3", title: "Buy Fertilizer", completed: true },
  { id: "4", title: "Buy hand gloves", completed: false },
  { id: "5", title: "Keep Pesticide", completed: false },
];

const Task: React.FC = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const toggleTaskCompletion = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          // If the task is being completed, set a timeout to remove it
          if (!task.completed) {
            setTimeout(() => {
              setTasks((prev) => prev.filter((t) => t.id !== id));
            }, 2000); // Remove after 2 seconds
          }
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };

  const renderTaskItem = ({
    item,
  }: {
    item: { id: string; title: string; completed: boolean };
  }) => (
    <TouchableOpacity
      style={styles.taskContainer}
      onPress={() => toggleTaskCompletion(item.id)}
    >
      <Text style={[styles.taskText, item.completed && styles.completedTask]}>
        {item.title}
      </Text>
      {item.completed && <Text style={styles.checkmark}>✓</Text>}
    </TouchableOpacity>
  );

  const addNewTask = () => {
    if (newTaskTitle.trim()) {
      const newTask = {
        id: Math.random().toString(),
        title: newTaskTitle,
        completed: false,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTaskTitle("");
      setModalVisible(false);
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/736x/40/7d/b4/407db4e050333957309cf613c101d1a2.jpg",
      }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.header}>My Tasks</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>Add New Task</Text>
        </TouchableOpacity>
        <FlatList
          data={tasks}
          renderItem={renderTaskItem}
          keyExtractor={(item) => item.id}
        />

        {/* Modal for adding a new task */}
        <Modal visible={modalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Add New Task</Text>
            <TextInput
              style={styles.input}
              placeholder="Task Title"
              value={newTaskTitle}
              onChangeText={setNewTaskTitle}
            />
            <TouchableOpacity style={styles.modalButton} onPress={addNewTask}>
              <Text style={styles.modalButtonText}>Save Task</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    padding: 20,
    // Removed the backgroundColor to make the background image fully visible
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#47be3d", // White color for readability against the background
    textAlign: "center",
    paddingVertical: 10,
    
    
  },
  addButton: {
    backgroundColor: "#4caf50",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
  },
  addButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginVertical: 8,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Slightly transparent background for task items
    borderRadius: 8,
  },
  taskText: {
    fontSize: 16,
    color: "#ffffff", // White text for task items
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  checkmark: {
    color: "green",
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4caf50",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: "#ffffff",
  },
  modalButton: {
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
  },
  closeButton: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#ff4d4d",
  },
  closeButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
  },
});

export default Task;
