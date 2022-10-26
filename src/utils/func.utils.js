
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