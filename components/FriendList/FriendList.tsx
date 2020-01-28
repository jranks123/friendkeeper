import React, { Component } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { AsyncStorage } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {calculateDaysAgo, calculateDaysOverdue} from "../../utils/date";
import { styles } from './styles';
import { globalStyles } from '../../styles';
import { retrieveData } from '../../utils/storage';

export default class FriendList extends Component {

    state = { names:[]};


    async componentDidMount() {
        try {
            const namesJSON = await (retrieveData("names"));
            if (namesJSON !== null) {
                this.setState({names: JSON.parse(namesJSON)});
            }
        } catch (err) {
            // handle errors
        }
    }
    render() {
        return (
            <View style={globalStyles.mainContainer}>
                <FlatList
                    data={this.state.names.sort((a,b) => {
                        const today = new Date();
                        const aDaysOverdue: number = calculateDaysOverdue(a.dateOfLastRendezvous, a.minimumDaysBetweenRendezvous);
                        const bDaysOverdue: number = calculateDaysOverdue(b.dateOfLastRendezvous, b.minimumDaysBetweenRendezvous);
                        if (aDaysOverdue > bDaysOverdue) {
                            return -1;
                        }
                        if (aDaysOverdue < bDaysOverdue) {
                            return 1;
                        }
                        return 0;
                    })
                }


                    renderItem={({ item }) => {
                        const daysOverdue: number = calculateDaysOverdue(item.dateOfLastRendezvous, item.minimumDaysBetweenRendezvous);
                        const daysSinceLastRendezvouz = calculateDaysAgo(item.dateOfLastRendezvous);
                        const color =  daysOverdue < 0 ? styles.greenBackground: styles.redBackground;
                        return (
                            <View style={styles.itemContainer}>
                                <View style = {styles.friendContainer}>
                                    <View style={[styles.statusBar, color]}>
                                        <Text></Text>
                                    </View>
                                    <View style={styles.friendInfo}>
                                        <Text >Name: {item.name}</Text>
                                        <Text >Days since last rendezvous: {daysSinceLastRendezvouz}</Text>
                                        <Text >Minimum days between rendezvous: {item.minimumDaysBetweenRendezvous}</Text>
                                        <Text >Overdue by: {daysOverdue}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                    //Setting the number of column
                    numColumns={1}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => this.props.navigation.navigate('AddFriend')}
                        title="Add friend"
                        color="#841584"
                    />
                </View>

            </View>
        );
    }
}


