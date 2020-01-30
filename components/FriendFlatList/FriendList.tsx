import React from 'react';
import {Button, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {calculateDaysAgo, calculateDaysOverdue} from "../../utils/date";
import { styles } from './styles';
import { globalStyles } from '../../styles';
import {updateItemLastDone} from '../../utils/storage';
import { EvilIcons } from '@expo/vector-icons';
import FriendListItem from "../FriendListItem/FriendListItem";

export interface Props {
    names: Friend[];
    refreshState: () => void;
    filterOutIf: (number) => boolean;
}


export default class FriendList extends React.Component<Props> {

    _getData() {
        return this.props.names.sort((a, b) => {
            const today = new Date();
            const aDaysOverdue: number = calculateDaysOverdue(a.dateOfLastRendezvous, parseInt(a.minimumDaysBetweenRendezvous));
            const bDaysOverdue: number = calculateDaysOverdue(b.dateOfLastRendezvous, parseInt(b.minimumDaysBetweenRendezvous));
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

                    const daysOverdue: number = calculateDaysOverdue(item.dateOfLastRendezvous, parseInt(item.minimumDaysBetweenRendezvous));
                    const listItemOnPress = () => updateItemLastDone(item.name).then(_ => this.props.refreshState());

                    if (this.props.filterOutIf(daysOverdue)) {
                        return null;
                    }
                    return (
                        <TouchableOpacity style={styles.itemContainer} onPress={listItemOnPress}>
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
