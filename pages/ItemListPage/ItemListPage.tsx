import React, { Component } from 'react';
import {Button, ScrollView, Text, View} from 'react-native';
import { styles } from './styles';
import { globalStyles } from '../../styles';
import ItemsList, {ItemListProps} from "../../components/ItemList/ItemList";
import { YellowBox } from 'react-native'
import { connect } from 'react-redux';
import {deleteAllItems, refreshPage} from '../../store/items/actions';

import {Item} from "../../store/items/types";
import {CombinedState} from "../../store/types";
import {clearEditItemStateAction} from "../../store/editItems/actions";
import {populateEditItemStateFromFromItem} from "../../store/editItems/actions";

YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

interface Props {
    items: Item[],
    deleteAllItems: () => void,
    refreshPage: () => void,
    populateEditItemStateFromFromItem: (item: Item) => void,
    clearEditItemState: () => void,
    navigation: any,
    date: Date
}



const ItemListPage = (props: Props) => {


    const overdueItemsListProps: ItemListProps = {
        items: props.items,
        filterOutIf: (daysOverdue: number) => daysOverdue <= 0,
        refreshPage: props.refreshPage,
        populateEditItemStateFromFromItem: props.populateEditItemStateFromFromItem,
        navigation: props.navigation
    };

    const upcomingItemsListProps: ItemListProps = {
        ...overdueItemsListProps,
        filterOutIf: (daysOverdue: number) => daysOverdue > 0,
    };


    return (
        <ScrollView contentContainerStyle={globalStyles.mainContainer}>
            <Text style={styles.title}
            > Overdue: </Text>
            <ItemsList
               {...overdueItemsListProps}
            >
            </ItemsList>
            <Text style={styles.gap}> </Text>
            <Text style={styles.title}> Coming up: </Text>
            <ItemsList
                {...upcomingItemsListProps}>
            >
            </ItemsList>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {
                        props.clearEditItemState();
                        props.navigation.navigate(
                            'AddFriend',
                            {
                                refreshLandingPageState: () => props.refreshPage()
                            })
                    }}
                    title="Add Friends"
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

const mapDispatchToProps = (dispatch) =>  ({
    deleteAllItems: () => dispatch(deleteAllItems()),
    refreshPage: () => dispatch(refreshPage()),
    clearEditItemState: () => dispatch(clearEditItemStateAction()),
    populateEditItemStateFromFromItem: (item) => dispatch(populateEditItemStateFromFromItem(item))

});


export default connect(mapStateToProps, mapDispatchToProps)(ItemListPage);


