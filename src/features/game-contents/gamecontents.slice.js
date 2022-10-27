import { createSlice } from '@reduxjs/toolkit';

export const gameContentsSlice = createSlice({
  name: 'gameContents',
  initialState: {
      gamePaths: [],
      blockedPaths: [],
      cardIds:[],
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
      state.gamePaths=[];
      state.blockedPaths=[];
      state.cardIds=[];
      state.resultPath={
        path:null,isSucceed:null
      }
    },
    setResultSucceed: (state,action)=>{
       state.resultPath.isSucceed = true;
       state.resultPath.path = action.payload;      
    },
    setGameContinue: (state)=>{
      state.gamePaths=[];
      state.blockedPaths=[];
      state.cardIds=[];
      state.resultPath={
        path:null,isSucceed:null
      }
    },
    setCardIds: (state,{payload})=>{
      (state.cardIds.length<2)&&state.cardIds.push(payload);
    }  





  },
});

//action creators
export const { setGamePaths, setCardIds,setBlockedPaths, setResultFailed, setResultSucceed, setGameContinue } = gameContentsSlice.actions;


//selectors
export const selectGamePaths = state => state.gameContents.gamePaths;
export const selectBlockedPaths = state => state.gameContents.blockedPaths;
export const selectResultPath = state => state.gameContents.resultPath.path;
export const selectResultPathStatus = state => state.gameContents.resultPath.isSucceed;
export const selectCardIds = state=> state.gameContents.cardIds

export default gameContentsSlice.reducer;
