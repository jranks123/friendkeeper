import React, { Component } from 'react';
import {Button, ScrollView, Text, View} from 'react-native';
import { styles } from './styles';
import { globalStyles } from '../../styles';
import ItemsList from "../../components/FriendFlatList/ItemList";
import { YellowBox } from 'react-native'
import { connect } from 'react-redux';
import { deleteAllItems } from '../../store/items/actions';
import {Item, ItemsState} from "../../store/items/types";

YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

export interface Props {
    items: Item[],
    deleteAllItems: () => void,
    navigation: any
}


const ItemListPage = (props: Props) => {

    console.log("hi");
    console.log(props);

    // @ts-ignore
    return (
        <ScrollView contentContainerStyle={globalStyles.mainContainer}>
            <Text style={styles.title}
            > Overdue: </Text>
            {/*<ItemsList*/}
            {/*    items={props.items}*/}
            {/*    filterOutIf={(daysOverdue) => daysOverdue <= 0 }*/}
            {/*    navigate={props.navigation.navigate}*/}
            {/*>*/}
            {/*</ItemsList>*/}

            <Text style={styles.gap}> </Text>
            <Text style={styles.title}> Coming up: </Text>
            {/*<ItemsList*/}
            {/*    items={props.items}*/}
            {/*    filterOutIf={(daysOverdue) => daysOverdue > 0 }*/}
            {/*    navigate={props.navigation.navigate}*/}
            {/*>*/}
            {/*</ItemsList>*/}
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {
                        // @ts-ignore
                        props.navigation.navigate('AddFriend')
                    }}
                    title="Add Friend"
                    color="#841584"
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={deleteAllItems}
                    title="Clear all friends"
                    color="#841584"
                />
            </View>

        </ScrollView>
    );
};


const mapStateToProps = ( state: ItemsState ) => ({
    items: state.items
});

const mapDispatchToProps = (dispatch: Function) =>  ({
    deleteAllItems: () => dispatch(deleteAllItems())
});


export default connect(mapStateToProps, mapDispatchToProps)(ItemListPage);


