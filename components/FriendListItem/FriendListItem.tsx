import React from 'react';
import {Text, View} from 'react-native';

import { styles } from './styles';
import { globalStyles } from '../../styles';
import { EvilIcons } from '@expo/vector-icons';

export interface Props {
    friend: Friend,
    daysOverdue: number
}

export default class FriendListItem extends React.Component<Props> {

    render() {
        const colorStyle = this.props.daysOverdue < 0 ? styles.greenBackground : styles.redBackground;

        return (<View style={styles.friendContainer}>
            <View style={[styles.statusBar, colorStyle]}>
                <Text></Text>
            </View>
            <View style={styles.friendInfo}>
                <Text style={styles.friendName}>{this.props.friend.name}</Text>
                <Text style={styles.friendName}>{this.props.friend.id}</Text>
                <Text style={globalStyles.bold}>
                    {Math.abs(this.props.daysOverdue)} days <Text
                    style={globalStyles.normal}>{this.props.daysOverdue > 0 ? "overdue" : "to rendezvous"}</Text>
                </Text>
            </View>
            <View style={styles.iconContainer}>
                <EvilIcons name="chevron-right" size={28} color="grey"/>
            </View>
        </View>)
    }
}
