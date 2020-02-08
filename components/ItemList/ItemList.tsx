import React from 'react';
import { FlatList } from 'react-native';
import { connect } from "react-redux";
import {
    populateEditItemStateFromFromItem
} from "../../store/editItems/actions";
import { deleteItem } from "../../store/items/actions";
import { Item } from "../../store/items/types";
import { setIsSwiping } from "../../store/landingPageState/actions";
import { CombinedState } from "../../store/types";
import { calculateDaysOverdue } from "../../utils/date";
import ItemSwipable from "../ItemSwipable";
import { styles } from './styles';

export interface ItemListProps {
    items: Item[];
    navigation: any,
    populateEditItemStateFromFromItem: (item: Item) => void,
    deleteItem?: (id: number) => void,
    setIsSwiping: (isSwiping: boolean) => void,
    isSwiping: boolean,
}

const sortItems = (items: Item[]): Item[] => {
    return items.sort((a, b) => {
        const aDaysOverdue: number = calculateDaysOverdue(a.dateOfLastAction, a.maximumDaysBetweenActions);
        const bDaysOverdue: number = calculateDaysOverdue(b.dateOfLastAction, b.maximumDaysBetweenActions);
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
        scrollEnabled={!props.isSwiping}
        style={styles.itemListContainer}
        data={sortItems(props.items)}
        renderItem={({item}) => {
            const navigateToItemOptionsPage = () => {
                props.populateEditItemStateFromFromItem(item);
                props.navigation.navigate('Options')
            };

            const navigateToEditItemOptionsPage = () => {
                props.populateEditItemStateFromFromItem(item);
                props.navigation.navigate('Edit Friend')
            };
            return (
                <ItemSwipable
                    item={item}
                    deleteItem={props.deleteItem}
                    setIsSwiping={props.setIsSwiping}
                    navigateToItemOptionsPage={navigateToItemOptionsPage}
                    navigateToEditItemOptionsPage={navigateToEditItemOptionsPage}
                />

            )
        }}
        // Setting the number of column
        numColumns={1}
        keyExtractor={(item, index) => index.toString()}
    />)};


const mapStateToProps = (state: CombinedState) => ({
    isSwiping: state.landingPageState.isSwiping
});


const mapDispatchToProps = (dispatch) =>  ({
    populateEditItemStateFromFromItem: (item: Item) => dispatch(populateEditItemStateFromFromItem(item)),
    deleteItem: (id: number) => dispatch(deleteItem(id)),
    setIsSwiping: (isSwiping: boolean) => dispatch(setIsSwiping(isSwiping))
});


export default connect(mapStateToProps, mapDispatchToProps)(ItemList);