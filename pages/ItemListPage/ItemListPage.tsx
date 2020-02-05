import React from 'react';
import { Button, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { YellowBox } from 'react-native'
import { connect } from 'react-redux';
import ItemsList, { ItemListProps } from "../../components/ItemList/ItemList";
import { deleteAllItems, refreshState } from '../../store/items/actions';
import { globalStyles } from '../../styles';
import { styles } from './styles';

import { clearEditItemStateAction } from "../../store/editItems/actions";
import { populateEditItemStateFromFromItem } from "../../store/editItems/actions";
import { Item } from "../../store/items/types";
import { CombinedState } from "../../store/types";

YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

interface Props {
    items: Item[],
    deleteAllItems: () => void,
    refreshState: () => void,
    populateEditItemStateFromFromItem: (item: Item) => void,
    clearEditItemState: () => void,
    navigation: any,
    date: Date
}



const ItemListPage = (props: Props) => {


    const overdueItemsListProps: ItemListProps = {
        items: props.items,
        filterOutIf: (daysOverdue: number) => daysOverdue <= 0,
        refreshState: props.refreshState,
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
            <View style={globalStyles.buttonContainer}>
                <TouchableOpacity
                    style={globalStyles.button}
                    onPress={() => {
                        props.clearEditItemState();
                        props.navigation.navigate(
                            'AddFriend',
                            {
                                refreshLandingPageState: () => props.refreshState()
                            })
                    }}
                >
                    <Text style={globalStyles.buttonText}> Add Friend</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={globalStyles.button}
                    onPress={props.deleteAllItems}
                >
                    <Text style={globalStyles.buttonText}>Clear all friends</Text>
                </TouchableOpacity>
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
    refreshState: () => dispatch(refreshState()),
    clearEditItemState: () => dispatch(clearEditItemStateAction()),
    populateEditItemStateFromFromItem: (item) => dispatch(populateEditItemStateFromFromItem(item))

});


export default connect(mapStateToProps, mapDispatchToProps)(ItemListPage);


