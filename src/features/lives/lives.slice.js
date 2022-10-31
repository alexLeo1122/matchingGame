import { createSlice } from '@reduxjs/toolkit';
import { basedLives } from '../../utils/basedData.ultils';

export const livesSlice = createSlice({
    name: 'lives',
    initialState: {
        value: basedLives,
    },
    reducers: {
        setLivesDecrement: (state) => {
            state.value -= 1;
        },
        setLivesIncrement: (state) => {
            state.value += 1;
        },
        setLiveReset: (state) => {
            // let a = state.value;
            state.value = basedLives;
        },
    },
});

export const { setLivesDecrement, setLivesIncrement, setLiveReset } = livesSlice.actions;

export const selectLives = (state) => state.lives.value;

export default livesSlice.reducer;
