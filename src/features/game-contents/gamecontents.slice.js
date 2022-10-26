import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';
// import { act } from 'react-dom/test-utils';

export const gameContentsSlice = createSlice({
  name: 'gameContents',
  initialState: {
   gamePaths: [],
   blockedPaths: [],
   resultPath: {
    path: null,
    isSucceed: null
   }
  },
  reducers: {
    setGamePaths: (state,action) => {
      state.gamePaths.push(action.payload);
    },
    setBlockedPaths: (state,action)=> {
        state.blockedPaths.push(action.payload);
    },
    setResultFailed: (state)=>{
        state.resultPath.isSucceed= false;
    },
    setResultSucceed: (state,action)=>{
       state.resultPath.isSucceed = true;
       state.resultPath.path = action.payload;
    }

  },
});

export const { setGamePaths, setBlockedPaths, setResultFailed, setResultSucceed } = gameContentsSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectGamePaths = state => state.gameContents.gamePaths;
export const selectBlockedPaths = state => state.gameContents.blockedPaths;
export const selectResultPath = state => state.gameContents.resultPath.path;
export const selectResultPathStatus = state => state.gameContents.resultPath.isSucceed;



export default gameContentsSlice.reducer;
