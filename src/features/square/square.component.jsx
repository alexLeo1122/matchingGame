
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



const squareInfo = {
  id: 0,
  visibility: Square_Visibility.viSibleTrue
};


export const Square = ({square}) => {
  const {id} = square;
  // const [paths,setGamePaths] = useState([]);
  const dispatch = useDispatch();
  const isClearMode = useSelector(selectIsClearMode);
  const isPlayMode = useSelector(selectIsPlayMode);
  // const openPaths = useSelector(selectOpenPaths);
  const sqrVisibility = square.visibility;
  let gamePaths = useSelector(selectGamePaths);
  // const pathLength = gamePaths.length;

  const setSomething=(e)=>{
        if(isClearMode&&!isPlayMode){
          const newObj = {...square, visibility: Square_Visibility.viSibleFalse}
          dispatch(setNotVisible(newObj));
        }
        //selectpath
        if (isClearMode&&isPlayMode&&gamePaths.length<1){
          dispatch(setGamePaths(id));
        }
        if (isClearMode&&isPlayMode&&gamePaths.length===1&&id!==gamePaths[0]){

          // const Paths = [gamePaths[0],id];
          dispatch(setGamePaths(id));
          dispatch({type:"Saga/SetBlockedPaths&&CalGame"});          
        //  const blockedPaths =  getBlockedPaths(Game_Board,openPaths,Paths);
        }
  }
  
  return (
    <>
<div  className ={ (sqrVisibility==="visibleFalse" && isClearMode=== true )?
`${styles.visibleFalse} ${styles.Game_Board_Square}`: styles.Game_Board_Square}
onClick={setSomething}>{id}</div>
       
    </>
  );
};