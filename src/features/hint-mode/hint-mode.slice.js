
import { createSlice } from '@reduxjs/toolkit';

export const hintModeSlice = createSlice({
  name: 'isHintMode',
  initialState: {
            value: false
  },
  reducers: {
        setIsHintModeTrue: (state) => {
            state.value= true;
        },  
        setIsHintModeFalse: (state) => {
            state.value= false;
        },  
        toggleIsHintMode: (state) => {
          // let a = state.value;
            state.value = !state.value;
        },  



  },
});

export const { toggleIsHintMode, setIsHintModeTrue, setIsHintModeFalse, } = hintModeSlice.actions;

export const selectIsHintMode = state => state.isHintMode.value;



export default hintModeSlice.reducer;
