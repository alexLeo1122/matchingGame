import { createSlice } from '@reduxjs/toolkit';
import { basedHintsLeft } from '../../utils/basedData.ultils';

export const gameSolutionsSlice = createSlice({
    name: 'solutions',
    initialState: {
        hint: { path: null, cardId: null },
        isTrue: true,
        hintsLeft: basedHintsLeft,
        remainingCardIds: [],
    },
    reducers: {
        setGameSolutionsTrue: (state) => {
            state.isTrue = true;
        },
        setGameSolutionsFalse: (state) => {
            state.isTrue = false;
        },
        setRemainingCardIds: (state, { payload }) => {
            state.remainingCardIds = payload;
        },
        setGameHint: (state, { payload }) => {
            state.hint = payload;
        },
        setHintsDecrement: (state) => {
            state.hintsLeft -= 1;
        },
    },
});

export const { setGameSolutionsTrue, setGameHint, setGameSolutionsFalse, setHintsDecrement, setRemainingCardIds } =
    gameSolutionsSlice.actions;

export const selectGameSolutionsStatus = (state) => state.solutions.isTrue;
export const selectHintsLeft = (state) => state.solutions.hintsLeft;
export const selectGameHintPath = (state) => state.solutions.hint.path;
export const selectRemainingCardIds = (state) => state.solutions.remainingCardIds;

export default gameSolutionsSlice.reducer;
