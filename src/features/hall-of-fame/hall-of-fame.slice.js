import { createSlice } from '@reduxjs/toolkit';
export const hallOfFameSlice = createSlice({
    name: 'hallOfFame',
    initialState: {
        value: [],
    },
    reducers: {
        setHallOfFame: (state, { payload }) => {
            state.value = payload;
        },
    },
});

//action creators
export const { setHallOfFame } = hallOfFameSlice.actions;

//selectors
export const selectHallOfFame = (state) => state.hallOfFame.value;

//export reducer
export default hallOfFameSlice.reducer;
