import { createSlice } from '@reduxjs/toolkit';
import { basedHallOfFameData } from './hall-of-fame.component';
export const hallOfFameSlice = createSlice({
    name: 'hallOfFame',
    initialState: {
        value: basedHallOfFameData,
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
