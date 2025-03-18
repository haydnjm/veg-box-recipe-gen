import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ShoppingItem } from "../lib/stores/shopping-list";
import { primaryColor } from "../styles/theme";

export default function ShoppingList() {
  // Add a ref for the FlatList
  const flatListRef =
    React.useRef<React.ComponentRef<typeof DraggableFlatList<ShoppingItem>>>(
      null
    );

  const [items, setItems] = useState([
    { id: "1", text: "Milk", completed: false },
    { id: "2", text: "Eggs", completed: false },
    { id: "3", text: "Bread", completed: false },
    { id: "4", text: "Apples", completed: false },
    { id: "5", text: "Chicken", completed: false },
  ]);
  const [newItem, setNewItem] = useState("");

  // Handle item completion toggle
  const toggleItemCompletion = (id: string) => {
    setItems(
      items
        .map((item) =>
          item.id === id ? { ...item, completed: !item.completed } : item
        )
        .sort((a, b) => {
          // Move completed items to the bottom
          if (a.completed && !b.completed) return 1;
          if (!a.completed && b.completed) return -1;
          return 0;
        })
    );
  };

  // Add a new item to the list
  const addItem = () => {
    if (newItem.trim()) {
      const newId = Date.now().toString();
      setItems((prevItems) => {
        const updatedItems = [
          ...prevItems,
          { id: newId, text: newItem.trim(), completed: false },
        ];

        // Use setTimeout to ensure the list is updated before scrolling
        setTimeout(() => {
          if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
          }
        }, 100);

        return updatedItems;
      });
      setNewItem("");
    }
  };

  // Delete an item
  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Render each shopping list item
  const renderItem = ({
    item,
    drag,
    isActive,
  }: {
    item: ShoppingItem;
    drag: any;
    isActive: boolean;
  }) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          activeOpacity={0.5}
          onLongPress={(e) => {
            console.log("long pressed", item.text);
            return drag(e);
          }}
          disabled={isActive}
          style={[
            styles.item,
            {
              backgroundColor: isActive
                ? "#f0f0f0"
                : item.completed
                ? "#e8f5e9"
                : "#ffffff",
            },
          ]}
        >
          <View style={styles.checkboxWrapper}>
            <TouchableOpacity onPress={() => toggleItemCompletion(item.id)}>
              <Ionicons
                name={item.completed ? "checkmark-circle" : "ellipse-outline"}
                size={24}
                color={item.completed ? primaryColor : "#666"}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.itemTextContainer}>
            <Text
              style={[
                styles.itemText,
                item.completed ? styles.completedItem : {},
              ]}
            >
              {item.text}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteItem(item.id)}
          >
            <Ionicons name="trash-outline" size={20} color="#ff6b6b" />
          </TouchableOpacity>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Shopping List</Text>

      <View style={styles.listContainer}>
        <DraggableFlatList
          ref={flatListRef}
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onDragEnd={({ data }) => setItems(data)}
          contentContainerStyle={styles.list}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add an item..."
          value={newItem}
          onChangeText={setNewItem}
          onSubmitEditing={addItem}
        />
        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <Ionicons name="add" size={24} color={primaryColor} />
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: "Merriweather_700Bold",
    fontSize: 28,
    marginBottom: 20,
    color: primaryColor,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "white",
    fontSize: 16,
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginLeft: 10,
  },
  listContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    padding: 15,
  },
  dragInstructions: {
    fontSize: 12,
    color: "#666",
    marginBottom: 15,
    textAlign: "center",
    fontStyle: "italic",
  },
  list: {
    flexGrow: 1,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  checkboxWrapper: {
    paddingRight: 10,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Merriweather_400Regular",
  },
  completedItem: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  deleteButton: {
    marginLeft: 10,
  },
});
