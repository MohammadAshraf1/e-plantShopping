import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // Adds an item or increases its quantity if it already exists
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);  // Search for an existing item in the `state.items` array that has the same name as the new item being added
      if (existingItem) {
        existingItem.quantity++; // Increase quantity if item already exists
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
        // This if statement will run first
        // quantity first declared here. It will add a plant by 1
      }
    },
    // Removes an item from the cart based on its name
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
       // If the name of the item is not equal to action.payload, that item is kept in the array
        // "Cactus", item.name !== "Cactus" is false, so it's filtered out (removed).
        // "Fern", item.name !== "Cactus" is true, so it's kept
    },
    // Updates the quantity of an existing item
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

// Export the action creators to be used in your components
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export the reducer to be included in your store
export default CartSlice.reducer;

//state.items is getting the plant information from payload