
import { useDispatch, useSelector } from "react-redux";
import { selectOpenPaths, setNotVisible } from "../board/board.slice";
import { selectIsClearMode } from "../clearmod/isClearMode.slice";
import styles from "./square.module.css"
import { SquareCons } from "../../utils/func.utils";
import { selectIsPlayMode } from "../playmode/isPlayMode.slice";
import { selectGamePaths, setBlockedPaths, setGamePaths } from "../game-contents/gamecontents.slice";
import { Game_Board, getBlockedPaths } from "../../utils/shortTestPath";
import { useEffect, useState } from "react";


export const Square_Visibility = {
    viSibleTrue : "visibleTrue",
    viSibleFalse: "visibleFalse"
}

let originalStyles = {};
let pathedStyles = {
  backgroundColor: "red"
}

const squareInfo = {
  id: 0,
  visibility: Square_Visibility.viSibleTrue
};


export const Square = ({square,pathed}) => {
  const {id} = square;
  const dispatch = useDispatch();
  const isClearMode = useSelector(selectIsClearMode);
  const isPlayMode = useSelector(selectIsPlayMode);
  const openPaths = useSelector(selectOpenPaths);
  
  
  const sqrVisibility = square.visibility;
  let gamePaths = useSelector(selectGamePaths);
  const [selected,setSelected] = useState(false);
  if(gamePaths.length<1 &&selected===true){
    console.log("checkcheckcheck")
    setSelected(false)
  }
  const runGameLogic=(e)=>{
        if(isClearMode&&!isPlayMode){
          const newObj = {...square, visibility: Square_Visibility.viSibleFalse}
          dispatch(setNotVisible(newObj));
        }
        if (isClearMode&&isPlayMode&&gamePaths.length<1&&!openPaths.includes(id)){
          dispatch(setGamePaths(id));
          // setSelected(true);
          if (selected){setSelected(false)}else{setSelected(true)}
        }
        if (isClearMode&&isPlayMode&&!openPaths.includes(id)&&gamePaths.length===1&&id!==gamePaths[0]){
          if (selected){setSelected(false)}
          dispatch(setGamePaths(id));
          dispatch({type:"Saga/SetBlockedPaths&&CalGame"});          
        }
  }
  
  return (
    <>
    { (!pathed)?
          <div  className ={ (sqrVisibility==="visibleFalse" && isClearMode=== true )?
          `${styles.visibleFalse} ${styles.Game_Board_Square}`:
           ((selected&&gamePaths.length===1)? `${styles.Game_Board_Square} ${styles.selected}`:`${styles.Game_Board_Square}`)}
          onClick={runGameLogic}>{id}</div>:
//check if the square belongs to successPath
          <div  className ={ (isClearMode=== true )?
          `${styles.visibleFalse} ${styles.Game_Board_Square} ${styles.pathed}`: 
          styles.Game_Board_Square}
          onClick={runGameLogic}>{id}</div>          
        }
    </>
  );
};