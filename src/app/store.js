import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import { MyLogger } from '../middlewares/middlewares';
import rootSaga from '../middlewares/sagas/sagas';
import createSagaMiddleware from '@redux-saga/core';
import boardReducer from "../features/board/board.slice"
import isClearModeReducer from '../features/clearmod/isClearMode.slice';
import isPlayModeReducer from "../features/playmode/isPlayMode.slice"
import gameContentsReducer from '../features/game-contents/gamecontents.slice';

const sagaMiddleWare = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
}


export const store = configureStore({
  reducer: {
    board: boardReducer,
    isClearMode: isClearModeReducer,
    isPlayMode: isPlayModeReducer,
    gameContents: gameContentsReducer

    // taskLists: persistReducer(persistConfig,taskListsReducer),

  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [sagaMiddleWare,MyLogger]
});

// export const persistor = persistStore(store)

sagaMiddleWare.run(rootSaga)