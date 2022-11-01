import { createSlice } from '@reduxjs/toolkit';
import { basedtotalCountDown } from '../../utils/basedData.ultils';

export const totalCountDownSlice = createSlice({
    name: 'totalCountDown',
    initialState: {
        value: basedtotalCountDown,
    },
    reducers: {
        setTotalCountDecrement: (state) => {
            state.value -= 1;
        },
        setTotalCountReset: (state) => {
            state.value = basedtotalCountDown;
        },
    },
});

//action creators
export const { setTotalCountDecrement, setTotalCountReset } = totalCountDownSlice.actions;

//selectors
export const selectTotalCountDown = (state) => state.totalCountDown.value;

//export reducer
export default totalCountDownSlice.reducer;
