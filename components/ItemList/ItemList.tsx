import React from 'react';
import { FlatList, TouchableOpacity} from 'react-native';
import {calculateDaysOverdue} from "../../utils/date";
import { styles } from './styles';
import ItemListElement from "../ItemListElement/ItemListElement";
import {Item, ItemsState} from "../../store/items/types";

export interface ItemListProps {
    items: Item[];
    filterOutIf: (number) => boolean;
    refreshPage: () => void;
    populateEditItemStateThenGoToEditItemForm: (item) => void
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

            const itemListElementProps = {item, daysOverdue};
            return (
                <TouchableOpacity style={styles.itemContainer} onPress={() => props.populateEditItemStateThenGoToEditItemForm(item)}>
                    <ItemListElement {...itemListElementProps}/>
                </TouchableOpacity>
            )
        }}
        //Setting the number of column
        numColumns={1}
        keyExtractor={(item, index) => index.toString()}
    />)};

export default ItemList;