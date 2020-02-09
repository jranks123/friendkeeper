import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import { persistCombineReducers, persistStore } from 'redux-persist';
import thunkMiddleware from "redux-thunk";
import { editItemReducer } from "./store/editItems/reducers";
import { itemsReducer } from "./store/items/reducers";

import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import EditItemForm from "./pages/EditItemForm/EditItemForm";
import ItemListPage from "./pages/ItemListPage/ItemListPage";
import ItemOptionsPage from "./pages/ItemOptionsPage/ItemOptionsPage";
import { landingPageReducer } from "./store/landingPageState/reducers";

const middlewares = [thunkMiddleware];
const middleWareEnhancer = applyMiddleware(...middlewares);

const config = {
    key: 'primary',
    storage: AsyncStorage,
};


const askNotification = async () => {
    // We need to ask for Notification permissions for ios devices
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (Constants.isDevice && status === 'granted')
        console.log('Notification permissions granted.');
};

askNotification().catch(err => console.warn("Error giving permission"));

const rootReducer = persistCombineReducers(config, {editItemState: editItemReducer, itemsState: itemsReducer, landingPageState: landingPageReducer});

const store = createStore(rootReducer, composeWithDevTools(middleWareEnhancer));
persistStore(
    store,
    null,
    () => {
        store.getState() // if you want to get restoredState
    }
);

export default function App() {
    const Stack = createStackNavigator();
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Friend Keeper"
                    screenOptions={{ gestureEnabled: false }}
                >
                    <Stack.Screen
                        name="Friend Keeper"
                        component={ItemListPage}
                    />
                    <Stack.Screen
                        name="Options"
                        component={ItemOptionsPage}
                    />
                    <Stack.Screen
                        name="Add New Friend"
                        component={EditItemForm}
                    />
                    <Stack.Screen
                        name="Edit Friend"
                        component={EditItemForm}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

