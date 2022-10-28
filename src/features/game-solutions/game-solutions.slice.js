
import { createSlice } from '@reduxjs/toolkit';

export const gameSolutionsSlice = createSlice({
  name: 'solutions',
  initialState: {
            hint: {path: null, cardId: null},
            isTrue:  true,
            hintsLeft: 3,
            remainingCardIds:[]
  },
  reducers: {
        setGameSolutionsTrue: (state) => {
        state.isTrue= true;
        },  
        setGameSolutionsFalse: (state) => {
            state.isTrue= false;
        }, 
        setRemainingCardIds: (state,{payload}) => {
            state.remainingCardIds = payload;
        }, 
        setGameHint: (state,{payload})=>{
            state.hint = payload;
        },



  },
});

export const {setGameSolutionsTrue, setGameHint, setGameSolutionsFalse, setRemainingCardIds } = gameSolutionsSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectGameSolutionsStatus = state => state.solutions.isTrue;
export const selectHintsLeft = state => state.solutions.hintsLeft;
export const selectGameHintPath = state => state.solutions.hint.path;
export const selectRemainingCardIds = state => state.solutions.remainingCardIds;



export default gameSolutionsSlice.reducer;
