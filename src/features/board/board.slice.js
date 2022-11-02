import { createSlice } from '@reduxjs/toolkit';

export const boardSlice = createSlice({
    name: 'board',
    initialState: {
        all: [],
        openPaths: [],
    },
    reducers: {
        setBoard: (state, action) => {
            state.all = action.payload;
        },
        setNotVisible: (state, action) => {
            const { id } = action.payload;
            if (!state.openPaths.includes(id)) {
                state.openPaths.push(id);
            }
            const newArr = state.all.map((square) => (square.id === id ? action.payload : square));
            state.all = newArr;
        },
        setBasedOpenPath: (state, action) => {
            let basedOpenPaths = action.payload; //array of objects
            //modify openPaths
            // let idsArr = basedOpenPaths.map(ele=>ele.id);
            state.openPaths = basedOpenPaths;
            //modify state.all
            state.all = state.all.map((obj) => {
                if (basedOpenPaths.includes(obj.id)) {
                    return { ...obj, visibility: 'visibleFalse' };
                } else {
                    return obj;
                }
            });
        },
    },
});

export const { setBoard, setNotVisible, setBasedOpenPath } = boardSlice.actions;

export const selectBoard = (state) => state.board.all;
export const selectOpenPaths = (state) => state.board.openPaths;

export default boardSlice.reducer;
