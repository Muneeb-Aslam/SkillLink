import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import userReducer from './reducers/user';
import createWebStorage from "redux-persist/es/storage/createWebStorage";

const rootReducer = combineReducers({
  user: userReducer,
});

const storage = typeof window !== "undefined"
    ? createWebStorage("local")
    : createPersistStore();
    
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;

export function createPersistStore() {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return {
      getItem() {
        return Promise.resolve(null);
      },
      setItem() {
        return Promise.resolve();
      },
      removeItem() {
        return Promise.resolve();
      },
    };
  }
  return createWebStorage("local");
}