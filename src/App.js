import React, { Fragment, useEffect, useState } from 'react';
import {Square, Square_Visibility} from "../src/features/square/square.component.jsx"
import { useDispatch, useSelector } from 'react-redux';
import { selectBoard, selectOpenPaths, setBasedOpenPath, setBoard, setNotVisible } from './features/board/board.slice';
import { selectIsClearMode, toggleIsClearMode } from './features/clearmod/isClearMode.slice';
import {SquareCons} from "./utils/func.utils"
import { selectIsPlayMode, toggleIsPlayMode } from './features/playmode/isPlayMode.slice.js';
// import {Square_Visibility} from "./features/square/square.component"
import { size } from './utils/shortTestPath.js';
import { squareArr } from './utils/shortTestPath.js';
import styles from "./App.module.css"
import { selectResultPath } from './features/game-contents/gamecontents.slice.js';
import {basedOpenPaths, basedCardsObjMap, remainingSquares,cardIdsArr, basedCardIds} from "../src/utils/shortTestPath"
import { setRemainingCardIds } from './features/game-solutions/game-solutions.slice.js';
import { changeIsHintMode, setIsHintModeTrue, toggleIsHintMode } from './features/hint-mode/hint-mode.slice.js';
import { selectCardsObjMap, setCardsObjMap } from './features/cardsObjMap/cardsObjMap.slice.js';


function App() {
  // console.log(basedCardIds)
  const dispatch = useDispatch();
  const cardsObjMap = useSelector(selectCardsObjMap)
  const board = useSelector(selectBoard);
  const openPaths = useSelector(selectOpenPaths);
  const {path}= useSelector(selectResultPath);  
  


  const isClearMode = useSelector(selectIsClearMode);
  const isPlayMode = useSelector(selectIsPlayMode);  

  const toggleClearMode=()=>{
   dispatch(toggleIsClearMode());
  }
  const togglePlayMode=()=>{
    dispatch(toggleIsPlayMode());
  }
  const getHint = ()=>{
    // e.preventDefault();
    dispatch(setIsHintModeTrue())
    dispatch({type:"Saga/toggleHintMode"})

  }


  useEffect(()=>{
    dispatch(setBoard(squareArr));
    dispatch(setBasedOpenPath(basedOpenPaths));
    dispatch(setRemainingCardIds(basedCardIds));
    dispatch(setCardsObjMap(basedCardsObjMap))
  },[])

  useEffect(()=>{
      if(openPaths.length>0){dispatch({type:"Saga/SolveGame"})};
  },[openPaths,cardsObjMap])

  //useeffect for calculating possible path

return (
    <Fragment>
    <div className={styles.GameUI}>
      <div className={styles.Game_Title}>My Board game</div>
      {/* control section */}
      <div className={styles.Button_Div}>
        <button className={isClearMode===true?styles.Clear_Mode: styles.Clear_Button} onClick={toggleClearMode}>Clear Mode</button>
        {" "}
        <button 
        className={isPlayMode===true?styles.Clear_Mode: styles.Clear_Button}
        onClick={togglePlayMode}>Play Mode</button>
        <button 
        className={styles.Clear_Button}
        onClick={getHint}>Get Hint</button>
      </div>


      {/* gameBoard section */}
      <div className={styles.Game_Board} >
        {
          board.map((square,index) =>{
           return (path&&path.includes(index))? <Square key={index} square={square } pathed={true}/>:
           <Square key={index} square={square} pathed={false}/>       
          })
        }
      </div>

    </div>
    


    </Fragment>  
  );
}

export default App;
