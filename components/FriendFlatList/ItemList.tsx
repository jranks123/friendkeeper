import React from 'react';
import { FlatList, TouchableOpacity} from 'react-native';
import {calculateDaysOverdue} from "../../utils/date";
import { styles } from './styles';
import FriendListItem from "../FriendListItem/FriendListItem";
import {NavigationParams} from "react-navigation";
import {Item} from "../../store/items/types";

export interface Props {
    items: Item[];
    filterOutIf: (number) => boolean;
    navigate: (screen: string, props: NavigationParams ) => void;
}


export default class ItemList extends React.Component<Props> {

    _getData() {
        return this.props.items.sort((a, b) => {
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
    }


    render() {


        return (
            <FlatList
                data={this._getData()}
                renderItem={({item}) => {

                    const daysOverdue: number = calculateDaysOverdue(item.dateOfLastAction, parseInt(item.maximumDaysBetweenActions));

                    const listItemOnPress = (item: Item) => {
                        this.props.navigate('EditFriend', {item: item})
                    };

                    if (this.props.filterOutIf(daysOverdue)) {
                        return null;
                    }
                    return (
                        <TouchableOpacity style={styles.itemContainer} onPress={() => listItemOnPress(item)}>
                            <FriendListItem friend={item} daysOverdue={daysOverdue}/>
                        </TouchableOpacity>
                    )
                }}
                //Setting the number of column
                numColumns={1}
                keyExtractor={(item, index) => index.toString()}
            />);
    }
}
