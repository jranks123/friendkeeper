import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {itemsReducer} from "./items/reducers";


export type AppState = ReturnType<typeof itemsReducer>;

export default function configureStore() {
    const middlewares = [thunkMiddleware];
    const middleWareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(
        itemsReducer,
        composeWithDevTools(middleWareEnhancer)
    );

    return store;
}
