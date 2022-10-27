import { createSlice } from '@reduxjs/toolkit';

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
   all: [],
   openPaths:[]
  },
  reducers: {
    setBoard: (state,action) => {
      state.all = action.payload
    },
    setNotVisible: (state,action)=> {
        const {id} = action.payload;
        if(!state.openPaths.includes(id)){         
          state.openPaths.push(id);
        }
        const newArr= state.all.map((square)=>
         square.id===id? action.payload : square
        )
        state.all = newArr;
    },
    setBasedOpenPath: (state,action)=>{
      let basedOpenPaths = action.payload; //array of objects
      //modify openPaths
      // let idsArr = basedOpenPaths.map(ele=>ele.id);
      state.openPaths = basedOpenPaths;      
      //modify state.all
     state.all= state.all.map(obj =>{
        if (basedOpenPaths.includes(obj.id)){ return {...obj, visibility: 'visibleFalse'}}
        else{ return obj}
      })
    }


  },
});

export const { setBoard, setNotVisible, setBasedOpenPath } = boardSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectBoard = state => state.board.all;
export const selectOpenPaths = state => state.board.openPaths;


export default boardSlice.reducer;
