import React from 'react';
import { FlatList, TouchableOpacity} from 'react-native';
import {calculateDaysOverdue} from "../../utils/date";
import { styles } from './styles';
import FriendListItem from "../FriendListItem/FriendListItem";
import {NavigationParams} from "react-navigation";
import {Item, ItemsState} from "../../store/items/types";
import {connect} from "react-redux";
import {AppState} from "../../store";
import {CombinedState} from "../../store/types";

interface Props {
    items: Item[];
    filterOutIf: (number) => boolean;
    navigate: (screen: string, props: NavigationParams ) => void;
}

const sortItems = (items: Item[]): Item[] => {
    return items.sort((a, b) => {
        const today = new Date();
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


const ItemList = (props: Props) => {
    return (
    <FlatList
        data={sortItems(props.items)}
        renderItem={({item}) => {
            const daysOverdue: number = calculateDaysOverdue(item.dateOfLastAction, parseInt(item.maximumDaysBetweenActions));
            const listItemOnPress = (item: Item) => {
                props.navigate('EditFriend', {item: item})
            };

            if (props.filterOutIf(daysOverdue)) {
                return null;
            }
            console.log("not null")
            return (
                <TouchableOpacity style={styles.itemContainer} onPress={() => listItemOnPress(item)}>
                    <FriendListItem friend={item} daysOverdue={daysOverdue}/>
                </TouchableOpacity>
            )
        }}
        //Setting the number of column
        numColumns={1}
        keyExtractor={(item, index) => index.toString()}
    />)};

const mapStateToProps = ( state: CombinedState ) => ({
    items: state.itemsState.items
});

export default connect(mapStateToProps)(ItemList);
