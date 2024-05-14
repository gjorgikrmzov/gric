import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    name: string;
    price: string;
    storeId: string;
    id: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const newItem = action.payload;
            const differentStoreExists = state.items.some(item => item.storeId !== newItem.storeId);
            if (differentStoreExists) {
                return; 
            }
            const existingItem = state.items.find(item => item.id === newItem.id && item.storeId === newItem.storeId);
            if (existingItem) {
                existingItem.quantity ++
            } else {
                state.items.push(newItem);
            }
        },
        updateItemQuantity(state, action: PayloadAction<{ storeId: string; id: string; quantity: number }>) {
            const { storeId, id, quantity } = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === id && item.storeId === storeId);
            if (itemIndex !== -1) {
                state.items[itemIndex].quantity = quantity;
            }
        },
        removeItem(state, action: PayloadAction<{ id: string }>) {
            state.items = state.items.filter(item => item.id !== action.payload.id);
        },
        clearCart(state) {
            state.items = [];
        }
        
    },
});

export const selectCartTotal = (state: any) => {
    return state.cart.items.reduce((total: number, item: any) => {
        const price = parseFloat(item.price);  
        const itemTotal = price * item.quantity;
        return total + itemTotal;
    }, 0);
};


export const { addItem, updateItemQuantity, removeItem, clearCart } = cartSlice.actions;
export default cartSlice;
