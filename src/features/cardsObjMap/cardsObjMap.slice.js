import { createSlice } from '@reduxjs/toolkit';
// import { act } from 'react-dom/test-utils';

export const cardsObjMapSlice = createSlice({
  name: 'cardsObjMap',
  initialState: {
    value: {}
  },
  reducers: {
    setCardsObjMap: (state,{payload}) => {
      state.value = payload;
    },

  },
});

export const { setCardsObjMap } = cardsObjMapSlice.actions;

export const selectCardsObjMap = state => state.cardsObjMap.value;

export default cardsObjMapSlice.reducer;
