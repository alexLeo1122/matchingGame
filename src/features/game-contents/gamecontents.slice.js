import { createSlice } from '@reduxjs/toolkit';

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
        state.gamePaths = [];
    },
    setResultSucceed: (state,action)=>{
       state.resultPath.isSucceed = true;
       state.resultPath.path = action.payload;      
    }

  },
});

//action creators
export const { setGamePaths, setBlockedPaths, setResultFailed, setResultSucceed } = gameContentsSlice.actions;


//selectors
export const selectGamePaths = state => state.gameContents.gamePaths;
export const selectBlockedPaths = state => state.gameContents.blockedPaths;
export const selectResultPath = state => state.gameContents.resultPath.path;
export const selectResultPathStatus = state => state.gameContents.resultPath.isSucceed;



export default gameContentsSlice.reducer;
