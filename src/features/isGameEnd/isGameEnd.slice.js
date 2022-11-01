import { createSlice } from '@reduxjs/toolkit';

export const isGameEndSlice = createSlice({
    name: 'isGameEnd',
    initialState: {
        value: false,
    },
    reducers: {
        setIsGameEnd: (state, { payload }) => {
            state.value = payload;
        },
    },
});

//action creators
export const { setIsGameEnd } = isGameEndSlice.actions;

//selectors
export const selectIsGameEnd = (state) => state.isGameEnd.value;

//export reducer
export default isGameEndSlice.reducer;
