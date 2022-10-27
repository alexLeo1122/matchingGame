
export function SquareCons(id, visibility) {
    this.id = id;
    this.visibility= visibility;
  }


  export const concatArrs = (arr1,arr2)=>{
    arr2.forEach((ele)=>{
      if (!arr1.includes(ele)){arr1.push(ele)}
  
    });
    return arr1;
  } 

  export function shuffleArr(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      // let t = array[i]; array[i] = array[j]; array[j] = t
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }

  export function CardObjCons(boardId, cardId) {
    this.boardid = boardId;
    this.cardId = cardId;
  }
