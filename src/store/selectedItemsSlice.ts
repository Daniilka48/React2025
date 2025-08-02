import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SelectedItem {
  name: string;
  birth_year: string;
  gender: string;
  url: string;
  height: string;
  mass: string;
}

interface SelectedItemsState {
  items: SelectedItem[];
}

const initialState: SelectedItemsState = {
  items: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleItem(state, action: PayloadAction<SelectedItem>) {
      const exists = state.items.find(
        (item) => item.url === action.payload.url
      );
      if (exists) {
        state.items = state.items.filter(
          (item) => item.url !== action.payload.url
        );
      } else {
        state.items.push(action.payload);
      }
    },
    clearSelected(state) {
      state.items = [];
    },
  },
});

export const { toggleItem, clearSelected } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
