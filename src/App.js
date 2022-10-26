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
import { selectResultPath } from './features/game-contents/gamecontents.slice.js';



function App() {
  const dispatch = useDispatch();
  const board = useSelector(selectBoard);
  const resultPath = useSelector(selectResultPath);
  //control section
  const isClearMode = useSelector(selectIsClearMode);
  const isPlayMode = useSelector(selectIsPlayMode);  

  
  
  //handling functions
  const toggleClearMode=()=>{
   dispatch(toggleIsClearMode());
  }
  const togglePlayMode=()=>{
    dispatch(toggleIsPlayMode());
  }


  
  useEffect(()=>{
    const squareArr = [];
    for (let i=0; i<size;i++){
      let squareObj = new SquareCons(i,Square_Visibility.viSibleTrue)
      squareArr.push(squareObj);
    }
    dispatch(setBoard(squareArr));
  },[])
  // useEffect(()=>{


  // },[resultPath])


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
          //  if(!resultPath){ return <Square key={index} square={square}/>}
          //  else if (resultPath.inclues(index)){
          //   return  <Square key={index} square={square } pathed={true}/>
          //  } else 

           return (resultPath&&resultPath.includes(index))? <Square key={index} square={square } pathed={true}/>:
           <Square key={index} square={square} pathed={false}/>         

          })
        }
      </div>

    </div>
    


    </Fragment>  
  );
}

export default App;
