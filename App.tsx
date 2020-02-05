import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider} from 'react-redux';
import thunkMiddleware from "redux-thunk";
import { AsyncStorage } from 'react-native';
import { persistStore, persistCombineReducers } from 'redux-persist';
import {composeWithDevTools} from "redux-devtools-extension";
import {itemsReducer} from "./store/items/reducers";
import {createStackNavigator} from "react-navigation-stack";
import {editItemReducer} from "./store/editItems/reducers";
import {createAppContainer} from "react-navigation";

import ItemListPage from "./pages/ItemListPage/ItemListPage";
import EditItemForm from "./pages/EditItemForm/EditItemForm";
import ItemOptionsPage from "./pages/ItemOptionsPage/ItemOptionsPage";

const middlewares = [thunkMiddleware];
const middleWareEnhancer = applyMiddleware(...middlewares);

const config = {
    key: 'primary',
    storage: AsyncStorage,
};

export const Navigator =   createStackNavigator({
    FriendKeeper: ItemListPage,
    ItemOptionsPage,
    AddFriend:  EditItemForm,
    EditFriend:  EditItemForm,
});


const AppContainer = createAppContainer(Navigator);

const rootReducer = persistCombineReducers(config, {editItemState: editItemReducer, itemsState: itemsReducer});

const store = createStore(rootReducer, composeWithDevTools(middleWareEnhancer));
persistStore(
    store,
    null,
    () => {
        store.getState() // if you want to get restoredState
    }
)


export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        );
    }
}
