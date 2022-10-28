
import { useDispatch, useSelector } from "react-redux";
import { selectOpenPaths, setNotVisible } from "../board/board.slice";
import { selectIsClearMode } from "../clearmod/isClearMode.slice";
import styles from "./square.module.css"
import { SquareCons } from "../../utils/func.utils";
import { selectIsPlayMode } from "../playmode/isPlayMode.slice";
import { selectGamePaths, selectResultPath, selectResultPathStatus, setBlockedPaths, setCardIds, setGameContinue, setGamePaths } from "../game-contents/gamecontents.slice";
import { Game_Board, getBlockedPaths } from "../../utils/shortTestPath";
import { useEffect, useState } from "react";
import { selectGameHint, selectGameHintPath } from "../game-solutions/game-solutions.slice";
import { selectIsHintMode } from "../hint-mode/hint-mode.slice";
import { selectCardsObjMap } from "../cardsObjMap/cardsObjMap.slice";

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
  const isHintMode = useSelector(selectIsHintMode);
  const {id} = square;   
  const hintResult = useSelector(selectGameHintPath);
  // const istrue = useSelector(selectResultPathStatus);
  const {path} = useSelector(selectResultPath);
  // const {path,isSucceed} = resultPath;

  let hinted = false;
  if (isHintMode){
    if(hintResult){if(hintResult.includes(id)){  hinted = true}};
  }
  
  const dispatch = useDispatch();
  const [cardId, setCardId] = useState("");
  const isClearMode = useSelector(selectIsClearMode);
  const isPlayMode = useSelector(selectIsPlayMode);
  const openPaths = useSelector(selectOpenPaths);
  const prevGameStatus = useSelector(selectResultPathStatus);
  
  
  const sqrVisibility = square.visibility;
  let gamePaths = useSelector(selectGamePaths);
  const [selected,setSelected] = useState(false);
  if(gamePaths.length<1 &&selected===true){
    setSelected(false)
  }
  const cardsObjMap = useSelector(selectCardsObjMap)
  
  const runGameLogic=(e)=>{

    if(!prevGameStatus){//prev == false
      if(isClearMode&&!isPlayMode){
        const newObj = {...square, visibility: Square_Visibility.viSibleFalse}
        dispatch(setNotVisible(newObj));
      }
      if (isClearMode&&isPlayMode&&gamePaths.length<1&&!openPaths.includes(id)){
        dispatch(setGamePaths(id));
        // setSelected(true);
        if (selected){
          setSelected(false);
        }else{
          setSelected(true);
          dispatch(setCardIds(cardId));
        }
      }
      if (isClearMode&&isPlayMode&&!openPaths.includes(id)&&gamePaths.length===1&&id!==gamePaths[0]){
        if (selected){setSelected(false)}
        dispatch(setGamePaths(id));
        dispatch(setCardIds(cardId));
        dispatch({type:"Saga/RunGame"});          
      }
    }else{//prev==true
      dispatch(setGameContinue());      
        if(!openPaths.includes(id)) {
          dispatch(setGamePaths(id));
          dispatch(setCardIds(cardId));
          setSelected(true);
        
        }

    }
 }
  


useEffect(()=>{
  if (cardsObjMap[id]){
       setCardId(cardsObjMap[id]["cardId"]);
  }
},[cardsObjMap])

  return (
    <>
    { (!pathed)?
    //check if squares not in success path
          <div  className ={ (sqrVisibility==="visibleFalse" && isClearMode=== true )?
          `${styles.visibleFalse} ${styles.Game_Board_Square}`:
          (hinted)?`${styles.Game_Board_Square} ${styles.hinted}`:
           ((selected&&gamePaths.length===1)? `${styles.Game_Board_Square} ${styles.selected}`:`${styles.Game_Board_Square}`)}
          onClick={runGameLogic}>{cardId}</div>:
//check if the square belongs to successPath
          <div  className ={ (isClearMode=== true )?
          `${styles.visibleFalse} ${styles.Game_Board_Square} ${styles.pathed}`: 
          styles.Game_Board_Square}
          onClick={runGameLogic}>{cardId}</div>          
        }
    </>
  );
};