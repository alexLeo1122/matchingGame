import { createSlice } from '@reduxjs/toolkit';
import { basedCountDown } from '../../utils/basedData.ultils';

export const countDownSlice = createSlice({
    name: 'countDown',
    initialState: {
        value: basedCountDown,
    },
    reducers: {
        setDecrement: (state, { payload }) => {
            state.value -= payload;
        },
        setCountDown: (state) => {
            state.value = basedCountDown;
        },
    },
});

//action creators
export const { setDecrement, setCountDown } = countDownSlice.actions;

//selectors
export const selectCountDown = (state) => state.countDown.value;

//export reducer
export default countDownSlice.reducer;
