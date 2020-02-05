// import {createAppContainer} from 'react-navigation';
// import {createStackNavigator} from 'react-navigation-stack';
// import FriendListPage from "./pages/FriendListPage/FriendListPage";
// import AddFriend from "./pages/AddFriend/AddFriend";
// import { Provider } from 'react-redux';
//
// const MainNavigator = createStackNavigator({
//     FriendKeeper: {screen: FriendListPage},
//     AddFriend: {screen: AddFriend},
//     EditFriend: {screen: AddFriend},
// });
//
//
// const App = createAppContainer(MainNavigator);
//
// export default App;


import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from "redux-thunk";;
import {composeWithDevTools} from "redux-devtools-extension";
import AddItem from "./pages/AddItem/AddItem";
import {itemsReducer} from "./store/items/reducers";
import {createStackNavigator} from "react-navigation-stack";
import {editItemReducer} from "./store/editItems/reducers";
import {createAppContainer} from "react-navigation";
import ItemListPage from "./pages/ItemListPage/ItemListpage";

const middlewares = [thunkMiddleware];
const middleWareEnhancer = applyMiddleware(...middlewares);


const AppContainer = createAppContainer(
    createStackNavigator({
        FriendKeeper: ItemListPage,
        AddFriend:  AddItem,
        EditFriend:  AddItem,
    })
);

const rootReducer = combineReducers({editItem: editItemReducer, items: itemsReducer})

const store = createStore(rootReducer, composeWithDevTools(middleWareEnhancer));


export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        );
    }
}
