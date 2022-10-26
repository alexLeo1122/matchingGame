import { createSlice } from '@reduxjs/toolkit';
// import { act } from 'react-dom/test-utils';

export const isPlayModeSlice = createSlice({
  name: 'isPlayMode',
  initialState: {
    value: false
  },
  reducers: {
    toggleIsPlayMode: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = !state.value;
    },

  },
});

export const { toggleIsPlayMode } = isPlayModeSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectIsPlayMode = state => state.isPlayMode.value;

export default isPlayModeSlice.reducer;
