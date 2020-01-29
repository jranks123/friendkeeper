import React, { Component } from 'react';
import {Button, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { AsyncStorage } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {calculateDaysAgo, calculateDaysOverdue} from "../../utils/date";
import { styles } from './styles';
import { globalStyles } from '../../styles';
import {retrieveItem, updateItemLastDone} from '../../utils/storage';

export default class FriendList extends Component {

    state = { names:[]};

    _refreshState = async (): Promise<boolean> =>  {
        try {
            const namesJSON = await (retrieveItem("names"));
            if (namesJSON !== null) {
                this.setState({names: JSON.parse(namesJSON)});
            }
            return true
        } catch (err) {
            return false;
            // handle errors
        }
    };

    _willFocusSubscription;

    async componentDidMount() {
        this._refreshState();
        // @ts-ignore
        this._willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => {
                this._refreshState();
            }
        );
    }


    render() {



        // @ts-ignore
        // @ts-ignore
        return (
            <ScrollView contentContainerStyle={globalStyles.mainContainer}>
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
                        console.log(item);
                        const daysOverdue: number = calculateDaysOverdue(item.dateOfLastRendezvous, item.minimumDaysBetweenRendezvous);
                        const daysSinceLastRendezvouz = calculateDaysAgo(item.dateOfLastRendezvous);
                        const color =  daysOverdue < 0 ? styles.greenBackground: styles.redBackground;
                        return (
                            <TouchableOpacity
                                style={styles.itemContainer}
                                onPress={() => updateItemLastDone(item.name).then(_ => this._refreshState())}
                            >
                                <View style = {styles.friendContainer}>
                                    <View style={[styles.statusBar, color]}>
                                        <Text></Text>
                                    </View>
                                    <View style={styles.friendInfo}>
                                        <Text ><Text style={globalStyles.bold}>Task Name:</Text> {item.name}</Text>
                                        <Text ><Text style={globalStyles.bold}>Days since last completed:</Text> {daysSinceLastRendezvouz}</Text>
                                        <Text ><Text style={globalStyles.bold}>Minimum days between doing task:</Text> {item.minimumDaysBetweenRendezvous}</Text>
                                        <Text ><Text style={globalStyles.bold}>Overdue by:</Text> {daysOverdue} days</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    //Setting the number of column
                    numColumns={1}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => {
                            // @ts-ignore
                            this.props.navigation.navigate('AddTask', {
                                refresh: this._refreshState
                            })
                        }}
                        title="Add Task"
                        color="#841584"
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => {
                            AsyncStorage.setItem("names", JSON.stringify([]))
                                .then(res => {this._refreshState()})
                        }}
                        title="Clear all tasks"
                        color="#841584"
                    />
                </View>

            </ScrollView>
        );
    }
}


