import React from 'react';
import { Text, View } from 'react-native';

import { EvilIcons } from '@expo/vector-icons';
import { Item } from "../../store/items/types";
import { globalStyles } from '../../styles';
import { styles } from './styles';
import {Avatar} from "react-native-elements";

export interface Props {
    item: Item
    daysOverdue: number
}

const ItemListElement = (props: Props) => {
    const colorStyle = props.daysOverdue < 0 ? styles.greenBackground : styles.redBackground;

    return (<View style={styles.friendContainer}>
        <View style={[styles.statusBar, colorStyle]}>
            <Text></Text>
        </View>
        <View style={{marginLeft:10, flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
            <Avatar source={{ uri: props.item.image }} size="medium" rounded />
        </View>
        <View style={styles.friendInfo}>
            <Text style={styles.friendName}>{props.item.name}</Text>
            <Text style={globalStyles.bold}>
                {Math.abs(props.daysOverdue)} days <Text
                style={globalStyles.normal}>{props.daysOverdue > 0 ? "overdue" : "to rendezvous"}</Text>
            </Text>
        </View>
        <View style={styles.iconContainer}>
            <EvilIcons name="chevron-right" size={28} color="grey"/>
        </View>
    </View>)
};

export default ItemListElement

