import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import { persistCombineReducers, persistStore } from 'redux-persist';
import thunkMiddleware from "redux-thunk";
import { editItemReducer } from "./store/editItems/reducers";
import { itemsReducer } from "./store/items/reducers";

import EditItemForm from "./pages/EditItemForm/EditItemForm";
import ItemListPage from "./pages/ItemListPage/ItemListPage";
import ItemOptionsPage from "./pages/ItemOptionsPage/ItemOptionsPage";

const middlewares = [thunkMiddleware];
const middleWareEnhancer = applyMiddleware(...middlewares);

const config = {
    key: 'primary',
    storage: AsyncStorage,
};

export const Navigator =   createStackNavigator({
    FriendKeeper: ItemListPage,
    Options: ItemOptionsPage,
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
