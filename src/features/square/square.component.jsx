
import { useDispatch, useSelector } from "react-redux";
import { selectOpenPaths, setNotVisible } from "../board/board.slice";
import styles from "./square.module.css"
import { SquareCons,pokemonSvgSize } from "../../utils/func.utils";
import { selectGamePaths, selectResultPath, selectResultPathStatus, setBlockedPaths, setCardIds, setGameContinue, setGamePaths } from "../game-contents/gamecontents.slice";
import { Game_Board, getBlockedPaths } from "../../utils/shortTestPath";
import { useEffect, useState } from "react";
import { selectGameHint, selectGameHintPath, selectRemainingCardIds } from "../game-solutions/game-solutions.slice";
import { selectIsHintMode } from "../hint-mode/hint-mode.slice";
import { selectCardsObjMap } from "../cardsObjMap/cardsObjMap.slice";

export const Square_Visibility = {
    viSibleTrue : "visibleTrue",
    viSibleFalse: "visibleFalse"
}

const squareInfo = {
  id: 0,
  visibility: Square_Visibility.viSibleTrue
};


export const Square = ({square,pathed}) => {
  const isHintMode = useSelector(selectIsHintMode);
  const {id} = square;   
  const hintResult = useSelector(selectGameHintPath);
  const {path} = useSelector(selectResultPath);

  let hinted = false;
  if (isHintMode){
    if(hintResult){if(hintResult.includes(id)){  hinted = true}};
  }
  
  const dispatch = useDispatch();
  const [cardId, setCardId] = useState(" ");
  const openPaths = useSelector(selectOpenPaths);
  const prevGameStatus = useSelector(selectResultPathStatus);
  const sqrVisibility = square.visibility;
  let gamePaths = useSelector(selectGamePaths);
  const [selected,setSelected] = useState(false);
  const cardIdsRemaining = useSelector(selectRemainingCardIds);
  if(gamePaths.length<1 &&selected===true){
    setSelected(false)
  }
  const cardsObjMap = useSelector(selectCardsObjMap)
  
  const runGameLogic=(e)=>{

    if(!prevGameStatus){//prev == false

      if (gamePaths.length<1&&!openPaths.includes(id)){
        dispatch(setGamePaths(id));
        // setSelected(true);
        if (selected){
          setSelected(false);
        }else{
          setSelected(true);
          dispatch(setCardIds(cardId));
        }
      }
      if (!openPaths.includes(id)&&gamePaths.length===1&&id!==gamePaths[0]){
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
          <div  className ={ (sqrVisibility==="visibleFalse" )?
          `${styles.visibleFalse} ${styles.Game_Board_Square}`:
          (hinted)?`${styles.Game_Board_Square} ${styles.hinted}`:
           ((selected&&gamePaths.length===1)? `${styles.Game_Board_Square} ${styles.selected}`:`${styles.Game_Board_Square}`)}
          onClick={runGameLogic}>
         
            {(!isNaN(cardId)&&cardIdsRemaining.includes(cardId))&&<img src={`images/${cardId+1}.svg`} alt="pokemon" style={pokemonSvgSize}/>
}
            
            </div>:
    //check if the square belongs to successPath
          <div  className ={ 
          `${styles.visibleFalse} ${styles.Game_Board_Square} ${styles.pathed}`}
          onClick={runGameLogic}>
                    {(!isNaN(cardId)&&cardIdsRemaining.includes(cardId))&&<img alt="" src={`https://pngimg.com/uploads/pokemon/pokemon_PNG${cardId+50}.png`} style={{width: "65px",height:"65px"}}/>}


          </div>          
        }
    </>
  );
};