import { createSlice } from '@reduxjs/toolkit';
import { basedHintsLeft } from '../../utils/basedData.ultils';

export const gameContentsSlice = createSlice({
    name: 'gameContents',
    initialState: {
        gamePaths: [],
        blockedPaths: [],
        cardIds: [],
        resultPath: {
            path: null,
            isSucceed: null,
        },
        scores: {
            value: 0,
        },
        bonus: {
            successHistory: [],
            bonusActionsLabel: '',
            value: 0,
            totalBonus: 0,
        },
    },
    reducers: {
        setGamePaths: (state, action) => {
            state.gamePaths.push(action.payload);
        },
        setBlockedPaths: (state, action) => {
            state.blockedPaths.push(action.payload);
        },
        setResultFailed: (state) => {
            state.gamePaths = [];
            state.blockedPaths = [];
            state.cardIds = [];
            state.resultPath = {
                path: null,
                isSucceed: null,
            };
        },
        setResultSucceed: (state, action) => {
            state.resultPath.isSucceed = true;
            state.resultPath.path = action.payload;
        },
        setGameContinue: (state) => {
            state.gamePaths = [];
            state.blockedPaths = [];
            state.cardIds = [];
            state.resultPath = {
                path: null,
                isSucceed: null,
            };
        },
        setCardIds: (state, { payload }) => {
            state.cardIds.length < 2 && state.cardIds.push(payload);
        },
        setScores: (state, { payload }) => {
            state.scores.value += payload;
        },
        //bonus
        setSuccessHistory: (state, { payload }) => {
            if (payload.length <= 4) {
                state.bonus.successHistory = payload;
            }
        },
        setBonus: (state, { payload }) => {
            state.bonus.value = payload;
            state.bonus.totalBonus += payload;
        },
        setBonusActionLabel: (state, { payload }) => {
            state.bonus.bonusActionsLabel = payload;
        },
        setScoresReset: (state) => {
            state.scores.value = 0;
        },
    },
});

//action creators
export const {
    setGamePaths,
    setScores,
    setCardIds,
    setBlockedPaths,
    setResultFailed,
    setResultSucceed,
    setGameContinue,
    setSuccessHistory,
    setBonus,
    setBonusActionLabel,
    setScoresReset,
} = gameContentsSlice.actions;

//selectors
export const selectGamePaths = (state) => state.gameContents.gamePaths;
export const selectBlockedPaths = (state) => state.gameContents.blockedPaths;
// export const selectResultPath = state => state.gameContents.resultPath;
export const selectResultPath = (state) => state.gameContents.resultPath;
export const selectScores = (state) => state.gameContents.scores.value;
export const selectResultPathStatus = (state) => state.gameContents.resultPath.isSucceed;
export const selectCardIds = (state) => state.gameContents.cardIds;
export const selectSuccessHistory = (state) => state.gameContents.bonus.successHistory;
export const selectBonus = (state) => state.gameContents.bonus.value;
export const selectBonusActionsLabel = (state) => state.gameContents.bonus.bonusActionsLabel;
export const selectTotalBonus = (state) => state.gameContents.bonus.totalBonus;
//export reducer
export default gameContentsSlice.reducer;
