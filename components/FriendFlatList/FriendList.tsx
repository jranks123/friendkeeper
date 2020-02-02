import React from 'react';
import {Button, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {calculateDaysAgo, calculateDaysOverdue} from "../../utils/date";
import { styles } from './styles';
import FriendListItem from "../FriendListItem/FriendListItem";
import {NavigationParams} from "react-navigation";

export interface Props {
    names: Friend[];
    refreshState: () => void;
    filterOutIf: (number) => boolean;
    navigate: (screen: string, props: NavigationParams ) => void;
}


export default class FriendList extends React.Component<Props> {

    _getData() {
        return this.props.names.sort((a, b) => {
            const today = new Date();
            const aDaysOverdue: number = calculateDaysOverdue(a.dateOfLastRendezvous, parseInt(a.maximumDaysBetweenRendezvous));
            const bDaysOverdue: number = calculateDaysOverdue(b.dateOfLastRendezvous, parseInt(b.maximumDaysBetweenRendezvous));
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

                    const daysOverdue: number = calculateDaysOverdue(item.dateOfLastRendezvous, parseInt(item.maximumDaysBetweenRendezvous));

                    const listItemOnPress = (friend: Friend) => {
                        this.props.navigate('EditFriend', {
                            refresh: this.props.refreshState,
                            friend: friend
                        })
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
