import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { MyLogger } from '../middlewares/middlewares';
import rootSaga from '../middlewares/sagas/sagas';
import createSagaMiddleware from '@redux-saga/core';
import boardReducer from '../features/board/board.slice';
import gameContentsReducer from '../features/game-contents/gamecontents.slice';
import gameSolutionsReducer from '../features/game-solutions/game-solutions.slice';
import hintModeReducer from '../features/hint-mode/hint-mode.slice';
import cardsObjMapReducer from '../features/cardsObjMap/cardsObjMap.slice';
import countDownReducer from '../features/countDown/count-down.slice';
const sagaMiddleWare = createSagaMiddleware();

const persistConfig = {
    key: 'root',
    storage,
};

export const store = configureStore({
    reducer: {
        board: boardReducer,
        gameContents: gameContentsReducer,
        solutions: gameSolutionsReducer,
        cardsObjMap: cardsObjMapReducer,
        isHintMode: hintModeReducer,
        countDown: countDownReducer,

        // taskLists: persistReducer(persistConfig,taskListsReducer),
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [sagaMiddleWare, MyLogger],
});

// export const persistor = persistStore(store)

sagaMiddleWare.run(rootSaga);
