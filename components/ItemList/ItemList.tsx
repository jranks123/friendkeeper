import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import {
    populateEditItemStateFromFromItem
} from "../../store/editItems/actions";
import { Item } from "../../store/items/types";
import { CombinedState } from "../../store/types";
import { calculateDaysOverdue } from "../../utils/date";
import ItemListElement from "../ItemListElement/ItemListElement";
import { styles } from './styles';

export interface ItemListProps {
    items: Item[];
    filterOutIf: (daysSinceAction: number) => boolean;
    refreshPage: () => void;
    navigation: any,
    populateEditItemStateFromFromItem: (item: Item) => void
}

const sortItems = (items: Item[]): Item[] => {
    return items.sort((a, b) => {
        const aDaysOverdue: number = calculateDaysOverdue(a.dateOfLastAction, parseInt(a.maximumDaysBetweenActions));
        const bDaysOverdue: number = calculateDaysOverdue(b.dateOfLastAction, parseInt(b.maximumDaysBetweenActions));
        if (aDaysOverdue > bDaysOverdue) {
            return -1;
        }
        if (aDaysOverdue < bDaysOverdue) {
            return 1;
        }
        return 0;
    });
};


const ItemList = (props: ItemListProps) => {
    return (
    <FlatList
        data={sortItems(props.items)}
        renderItem={({item}) => {
            const daysOverdue: number = calculateDaysOverdue(item.dateOfLastAction, parseInt(item.maximumDaysBetweenActions));
            if (props.filterOutIf(daysOverdue)) {
                return null;
            }

            const navigateToItemOptionsPage = () => {
                props.populateEditItemStateFromFromItem(item);
                props.navigation.navigate('ItemOptionsPage')
            };

            const itemListElementProps = {item, daysOverdue};
            return (
                <TouchableOpacity style={styles.itemContainer} onPress={() => navigateToItemOptionsPage()}>
                    <ItemListElement {...itemListElementProps}/>
                </TouchableOpacity>
            )
        }}
        // Setting the number of column
        numColumns={1}
        keyExtractor={(item, index) => index.toString()}
    />)};


const mapStateToProps = (state: CombinedState) => ({
    items: state.itemsState.items,
    id: state.editItemState.id,
    name: state.editItemState.name,
    maximumDaysBetweenActions: state.editItemState.maximumDaysBetweenActions,
    dateOfLastAction: state.editItemState.dateOfLastAction
});


const mapDispatchToProps = (dispatch) =>  ({
    populateEditItemStateFromFromItem: (item: Item) => dispatch(populateEditItemStateFromFromItem(item)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ItemList);