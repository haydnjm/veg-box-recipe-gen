import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ShoppingItem = {
  id: string;
  text: string;
  completed: boolean;
};

interface ShoppingListStore {
  items: ShoppingItem[];
  addItem: (text: string) => void;
  deleteItem: (id: string) => void;
  toggleItem: (id: string) => void;
  setItems: (newItems: ShoppingItem[]) => void;
  clearItems: () => void;
  addTestItems: () => void;
}

// Create Zustand store with persistence
const useShoppingListStore = create(
  persist<ShoppingListStore>(
    (set) => ({
      items: [],
      addTestItems: () =>
        set((state) => ({
          items: [
            ...state.items,
            {
              id: "1",
              text: "Milk",
              completed: false,
            },
            {
              id: "2",
              text: "Bread",
              completed: false,
            },
            {
              id: "3",
              text: "Eggs",
              completed: false,
            },
          ],
        })),
      addItem: (text: string) =>
        set((state) => ({
          items: [
            ...state.items,
            {
              id: Date.now().toString(),
              text: text.trim(),
              completed: false,
            },
          ],
        })),
      deleteItem: (id: string) =>
        set((state: { items: ShoppingItem[] }) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      toggleItem: (id: string) =>
        set((state: { items: ShoppingItem[] }) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, completed: !item.completed } : item
          ),
        })),
      setItems: (newItems: ShoppingItem[]) => set({ items: newItems }),
      clearItems: () => set({ items: [] }),
    }),
    {
      name: "shopping-list-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useShoppingListStore;
