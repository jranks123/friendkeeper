import React, { Component } from 'react';
import {Button, ScrollView, Text, View} from 'react-native';
import { styles } from './styles';
import { globalStyles } from '../../styles';
import ItemsList from "../../components/FriendFlatList/ItemList";
import { YellowBox } from 'react-native'
import { connect } from 'react-redux';
import {deleteAllItems, refreshPage} from '../../store/items/actions';
import {Item, ItemsState} from "../../store/items/types";
import {CombinedState} from "../../store/types";

YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

interface Props {
    items: Item[],
    deleteAllItems: () => void,
    refreshPage: () => void,
    navigation: any,
    date: Date
}


const ItemListPage = (props: Props) => {
    // @ts-ignore
    return (
        <ScrollView contentContainerStyle={globalStyles.mainContainer}>
            <Text style={styles.title}
            > Overdue: </Text>
            <ItemsList
                filterOutIf={(daysOverdue) => daysOverdue <= 0 }
                navigate={props.navigation.navigate}
            >
            </ItemsList>
            <Text style={styles.gap}> </Text>
            <Text style={styles.title}> Coming up: </Text>
            <ItemsList
                filterOutIf={(daysOverdue) => daysOverdue > 0 }
                navigate={props.navigation.navigate}
            >
            </ItemsList>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {
                        // @ts-ignore
                        props.navigation.navigate(
                            'AddFriend',
                            {
                                onBack: () => props.refreshPage()//function to refresh screen,
                            }
                        )
                    }}
                    title="Add Friend"
                    color="#841584"
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={props.deleteAllItems}
                    title="Clear all friends"
                    color="#841584"
                />
            </View>

        </ScrollView>
    );
};


const mapStateToProps = ( state: CombinedState ) => ({
    items: state.itemsState.items,
    date: state.itemsState.lastRefreshDate
});

const mapDispatchToProps = (dispatch: Function) =>  ({
    deleteAllItems: () => dispatch(deleteAllItems()),
    refreshPage: () => dispatch(refreshPage())
});


export default connect(mapStateToProps, mapDispatchToProps)(ItemListPage);


