import React, { Fragment, useEffect } from 'react';
import {Square, Square_Visibility} from "../src/features/square/square.component.jsx"
import { useDispatch, useSelector } from 'react-redux';
import { selectBoard, setBoard } from './features/board/board.slice';
import { selectIsClearMode, toggleIsClearMode } from './features/clearmod/isClearMode.slice';
import {SquareCons} from "./utils/func.utils"
import { selectIsPlayMode, toggleIsPlayMode } from './features/playmode/isPlayMode.slice.js';
// import {Square_Visibility} from "./features/square/square.component"
import { size } from './utils/shortTestPath.js';

import styles from "./App.module.css"



function App() {
  const dispatch = useDispatch();
  const squareArr = [];
  for (let i=0; i<size;i++){
    let squareObj = new SquareCons(i,Square_Visibility.viSibleTrue)
    squareArr.push(squareObj);
  }
  const board = useSelector(selectBoard);
  const isClearMode = useSelector(selectIsClearMode);
  const isPlayMode = useSelector(selectIsPlayMode);



  const toggleClearMode=()=>{

   dispatch(toggleIsClearMode());
  }
  const togglePlayMode=()=>{
    dispatch(toggleIsPlayMode());
  }



  useEffect(()=>{
    dispatch(setBoard(squareArr));
  },[])
return (
    <Fragment>
    <div className={styles.GameUI}>
      <div className={styles.Game_Title}>My Board game</div>
      <div className={styles.Button_Div}>
        <button className={isClearMode===true?styles.Clear_Mode: styles.Clear_Button} onClick={toggleClearMode}>Clear Mode</button>
        {" "}
        <button 
        className={isPlayMode===true?styles.Clear_Mode: styles.Clear_Button}
        onClick={togglePlayMode}>Play Mode</button>

      </div>

      <div className={styles.Game_Board} >
        {
          board.map((square,index) =>{
            return <Square key={index} square={square}/>
          })
        }
      </div>

    </div>
    


    </Fragment>  
  );
}

export default App;
