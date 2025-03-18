import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Define Recipe type
interface Recipe {
  id: string;
  title: string;
  category: string;
  prepTime: string;
  cookTime: string;
  image: string;
  favorite: boolean;
}

// Sample recipe data
const recipeData: Recipe[] = [
  {
    id: "1",
    title: "Vegetable Stir Fry",
    category: "Main Course",
    prepTime: "15 min",
    cookTime: "10 min",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    favorite: true,
  },
  {
    id: "2",
    title: "Avocado Toast",
    category: "Breakfast",
    prepTime: "5 min",
    cookTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    favorite: false,
  },
  {
    id: "3",
    title: "Quinoa Salad",
    category: "Salad",
    prepTime: "10 min",
    cookTime: "15 min",
    image:
      "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    favorite: true,
  },
  {
    id: "4",
    title: "Mushroom Risotto",
    category: "Main Course",
    prepTime: "10 min",
    cookTime: "25 min",
    image:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    favorite: false,
  },
  {
    id: "5",
    title: "Berry Smoothie",
    category: "Beverage",
    prepTime: "5 min",
    cookTime: "0 min",
    image:
      "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    favorite: true,
  },
];

export default function RecipesScreen() {
  const renderRecipeItem = ({ item }: { item: Recipe }) => (
    <TouchableOpacity style={styles.recipeCard}>
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
      <View style={styles.recipeInfo}>
        <View style={styles.titleRow}>
          <Text style={styles.recipeTitle}>{item.title}</Text>
          <Ionicons
            name={item.favorite ? "heart" : "heart-outline"}
            size={24}
            color={item.favorite ? "#E53935" : "#757575"}
          />
        </View>
        <Text style={styles.recipeCategory}>{item.category}</Text>
        <View style={styles.timeInfo}>
          <View style={styles.timeItem}>
            <Ionicons name="time-outline" size={16} color="#757575" />
            <Text style={styles.timeText}>Prep: {item.prepTime}</Text>
          </View>
          <View style={styles.timeItem}>
            <Ionicons name="flame-outline" size={16} color="#757575" />
            <Text style={styles.timeText}>Cook: {item.cookTime}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Recipes</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={24} color="#e67e22" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={recipeData}
        renderItem={renderRecipeItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.recipeList}
      />

      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  headerTitle: {
    fontSize: 20,
    color: "#333",
    fontFamily: "Merriweather_700Bold",
  },
  filterButton: {
    padding: 8,
  },
  recipeList: {
    padding: 16,
  },
  recipeCard: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  recipeImage: {
    width: "100%",
    height: 180,
  },
  recipeInfo: {
    padding: 16,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  recipeTitle: {
    fontSize: 18,
    color: "#333",
    flex: 1,
    fontFamily: "Merriweather_700Bold",
  },
  recipeCategory: {
    fontSize: 14,
    color: "#e67e22",
    marginBottom: 8,
  },
  timeInfo: {
    flexDirection: "row",
    marginTop: 8,
  },
  timeItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  timeText: {
    fontSize: 14,
    color: "#757575",
    marginLeft: 4,
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#e67e22",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
