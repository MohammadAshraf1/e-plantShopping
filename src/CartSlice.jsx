import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        const {name, image, cost} = action.payload;
        const existingItem = state.items.find(item => item.name === name); // Search for an existing item in the `state.items` array that has the same name as the new item being added
        if(existingItem){
            existingItem.quantity++;    // found, increase its quantity by 1
        }else{
            state.items.push({ name, image, cost, quantity: 1 });
            // This if statement will run first
            // quantity first declared here. It will add a plant by 1
        }
    },
    removeItem: (state, action) => {
        state.items = state.items.filter(item => item.name !== action.payload);
        // If the name of the item is not equal to action.payload, that item is kept in the array
        // "Cactus", item.name !== "Cactus" is false, so it's filtered out (removed).
        // "Fern", item.name !== "Cactus" is true, so it's kept
    },
    updateQuantity: (state, action) => {
            const {name, quantity} = action.payload;
            const itemToUpdate =  state.items=state.items.find(item => item.name === name);
            if(itemToUpdate){
                itemToUpdate.quantity=quantity;   
            }
    
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;

//state.items is getting the plant information from payload
