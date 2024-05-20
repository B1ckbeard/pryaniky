import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const itemsAdapter = createEntityAdapter();
const initialState = itemsAdapter.getInitialState({
  data: {},
});

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, { payload }) => {
      itemsAdapter.addOne(state, payload);
    },
    addItems: itemsAdapter.addMany,
    removeItem: (state, { payload }) => {
      itemsAdapter.removeOne(state, payload);
    },
    updateItem: (state, { payload }) => {
      itemsAdapter.updateOne(state, payload);
    },
  },
});

export const { actions } = itemsSlice;
export const selectors = itemsAdapter.getSelectors((state) => state.items);
export default itemsSlice.reducer;
