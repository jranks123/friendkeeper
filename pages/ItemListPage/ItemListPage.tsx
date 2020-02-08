import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { YellowBox } from 'react-native'
import { connect } from 'react-redux';
import ItemsList, { ItemListProps } from "../../components/ItemList/ItemList";
import { globalStyles } from '../../styles';
import { styles } from './styles';

import { clearEditItemStateAction } from "../../store/editItems/actions";
import { populateEditItemStateFromFromItem } from "../../store/editItems/actions";
import { Item } from "../../store/items/types";
import { CombinedState } from "../../store/types";
import { deleteAllItems } from "../../store/items/actions";

YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

interface Props {
    items: Item[],
    deleteAllItems: () => void,
    populateEditItemStateFromFromItem: (item: Item) => void,
    clearEditItemState: () => void,
    navigation: any,
}


const ItemListComponent = (itemListProps: ItemListProps, copy: string) => {
    return itemListProps.items.length > 0 ? (<View>
        <ItemsList {...itemListProps}> </ItemsList>
    </View>) : null;
};

const NoItemsCopy = (items: Item[]) => {
    return items.length === 0 ? (
            <View style={globalStyles.centeredTextContainer}>
                <Text
                 style={styles.noFriendsCopy}
                >Add a friend to get started</Text>
            </View>
    ) : null;
};

const ItemListPage = (props: Props) => {

    const overdueItemsListProps: ItemListProps = {
        items: props.items,
        populateEditItemStateFromFromItem: props.populateEditItemStateFromFromItem,
        navigation: props.navigation
    };

    const upcomingItemsListProps: ItemListProps = {
        ...overdueItemsListProps,
        items: props.items
    };

    console.log("refreshing page");

    return (
            <View style={styles.pageContainer}>
                <ScrollView >
                    {NoItemsCopy(props.items)}
                    {ItemListComponent(overdueItemsListProps, "Overdue:")}
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={globalStyles.button}
                        onPress={() => {
                            props.clearEditItemState();
                            props.navigation.navigate('Add New Friend')
                        }}
                    >
                        <Text style={globalStyles.buttonText}> Add Friend </Text>
                    </TouchableOpacity>
                </View>
            </View>
    );
};


const mapStateToProps = ( state: CombinedState ) => ({
    items: state.itemsState.items,
});

const mapDispatchToProps = (dispatch) =>  ({
    clearEditItemState: () => dispatch(clearEditItemStateAction()),
    populateEditItemStateFromFromItem:  (item) => dispatch(populateEditItemStateFromFromItem(item))

});


export default connect(mapStateToProps, mapDispatchToProps)(ItemListPage);


