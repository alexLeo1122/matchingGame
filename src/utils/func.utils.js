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

export const creatBarProgress = (barPercentString, barPerCent) => {
    let newObj;
    if (barPerCent >= 0.7) {
        newObj = {
            ...basedCountDownBar,
            width: barPercentString,
        };
    } else if (barPerCent >= 0.4) {
        newObj = {
            ...TwoThirdsBar,
            width: barPercentString,
        };
    } else {
        newObj = {
            ...oneThirdBar,
            width: barPercentString,
        };
    }
    return newObj;
};
