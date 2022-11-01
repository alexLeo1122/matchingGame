import { basedCountDownBar, TwoThirdsBar, oneThirdBar } from './basedData.ultils';

export function SquareCons(id, visibility) {
    this.id = id;
    this.visibility = visibility;
}

export const concatArrs = (arr1, arr2) => {
    arr2.forEach((ele) => {
        if (!arr1.includes(ele)) {
            arr1.push(ele);
        }
    });
    return arr1;
};

export function shuffleArr(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
        // let t = array[i]; array[i] = array[j]; array[j] = t
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function CardObjCons(boardId, cardId) {
    this.boardid = boardId;
    this.cardId = cardId;
}

export const delay = (ms) =>
    new Promise((res) => {
        setTimeout(() => {
            res(`Waiting ${ms}ms`);
        }, ms);
    });

export const pokemonSvgSize = {
    width: '68px',
    height: '68px',
};

export const percentConver = (number) => {
    return `${number * 100}%`;
};

export const creatBarProgress = (barPerCent) => {
    //     let newObj;
    //    if ( 0.4<= barPerCent&&barPerCent <0.7) {
    //         newObj = {
    //             ...TwoThirdsBar,
    //         };
    //     } else if {
    //         newObj = {
    //             ...oneThirdBar,
    //         };
    //     }
    //     return newObj;
    return null;
};

export const convertNumToMin = (number) => {
    let min = Math.floor(number / 60);
    let sec = number - min * 60;
    if (sec < 10) {
        sec = `0${sec}`;
    }
    return `${min}:${sec}`;
};

export const filterSuccessArr = (arr, data) => {
    let newArr = [];
    if (arr.length >= 4) {
        newArr = arr.filter((_, index) => index !== 0);
        newArr.push(data);
    } else {
        newArr = [...arr, data];
    }
    return newArr;
};

export const calSuccessBonus = (arr) => {
    let bonus = [];
    let length = arr.length;
    if (length < 2) {
        return bonus;
    }
    //doubleKill
    if (length >= 2) {
        if (arr[length - 1] === 20 && arr[length - 2] === 20) {
            bonus[0] = 'double Catched';
            bonus[1] = 15;
        }
    }
    if (length >= 3) {
        if (arr[length - 1] === 20 && arr[length - 2] === 20 && arr[length - 3] === 20) {
            bonus[0] = 'tripple Catched';
            bonus[1] = 25;
        }
    }
    if (length >= 4) {
        if (arr[length - 1] === 20 && arr[length - 2] === 20 && arr[length - 3] === 20 && arr[length - 4] === 20) {
            bonus[0] = 'Master Catched';
            bonus[1] = 35;
        }
    }

    return bonus; // ["Master",40]
};

export const createSagaAct = (type) => ({ type });
