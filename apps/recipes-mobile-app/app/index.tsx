import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomePage() {
  const insets = useSafeAreaInsets();

  // Mock data for recipe stats
  const stats = {
    totalRecipes: 24,
    favoriteRecipes: 8,
    recentlyCooked: 3,
    shoppingListItems: 12,
  };

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Welcome to Veg Box</Text>
        <Text style={styles.welcomeSubtitle}>
          Your personal recipe management app
        </Text>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Your Cooking Journey</Text>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Ionicons name="book" size={32} color="#e67e22" />
            <Text style={styles.statNumber}>{stats.totalRecipes}</Text>
            <Text style={styles.statLabel}>Total Recipes</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="heart" size={32} color="#E53935" />
            <Text style={styles.statNumber}>{stats.favoriteRecipes}</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="flame" size={32} color="#FF9800" />
            <Text style={styles.statNumber}>{stats.recentlyCooked}</Text>
            <Text style={styles.statLabel}>Recently Cooked</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="cart" size={32} color="#1976D2" />
            <Text style={styles.statNumber}>{stats.shoppingListItems}</Text>
            <Text style={styles.statLabel}>Shopping Items</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionButton}>
          <Ionicons name="add-circle" size={24} color="#e67e22" />
          <Text style={styles.actionText}>Add New Recipe</Text>
        </View>
        <View style={styles.actionButton}>
          <Ionicons name="shuffle" size={24} color="#e67e22" />
          <Text style={styles.actionText}>Random Recipe Suggestion</Text>
        </View>
        <View style={styles.actionButton}>
          <Ionicons name="calendar" size={24} color="#e67e22" />
          <Text style={styles.actionText}>Plan Weekly Menu</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  contentContainer: {
    padding: 16,
  },
  welcomeSection: {
    marginBottom: 24,
    backgroundColor: "#e67e22",
    padding: 20,
    borderRadius: 12,
  },
  welcomeTitle: {
    fontSize: 28,
    color: "white",
    marginBottom: 8,
    fontFamily: "Merriweather_700Bold",
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 16,
    color: "#333",
    fontFamily: "Merriweather_700Bold",
  },
  statsContainer: {
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    width: "48%",
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
    color: "#333",
  },
  statLabel: {
    fontSize: 14,
    color: "#757575",
  },
  quickActions: {
    marginBottom: 24,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  actionText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#333",
  },
});
