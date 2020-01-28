import React, { Component } from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {AsyncStorage} from 'react-native';

export default class FriendList extends Component {

    _storeData = async (): Promise<void> => {
        try {
            let friends =  await this._retrieveData("names");
            if (friends != null) {
                alert(friends)
            } else {
                await AsyncStorage.setItem("names", JSON.stringify([]));
            }
        } catch (e) {
            alert("error storing data: " + e);
        }
    };



    _retrieveData = async (key: string): Promise<string | null> => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                // We have data!!
                return value;
            }
            return null
        } catch (error) {
            alert("There was an error retrieving data: " + error);
            return null;
            // Error retrieving data
        }

    };


    state = { names: [
        {
            name: "Max",
            daysSinceLastRendezvous: 30,
            minimumDaysBetweenRendezvous: 3,
        },
        {
            name: "Luke Swann",
            daysSinceLastRendezvous: 10,
            minimumDaysBetweenRendezvous: 38,
        },
        {
            name: "Kitty",
            daysSinceLastRendezvous: 10,
            minimumDaysBetweenRendezvous: 28,
        },
        {
            name: "Hannah",
            daysSinceLastRendezvous: 10,
            minimumDaysBetweenRendezvous: 49,
        },


        ]};

    render() {
        return (
            <View style={styles.MainContainer}>
                <FlatList
                    data={this.state.names.sort((a,b) => {
                            const aDaysOverdue: number = a.daysSinceLastRendezvous - a.minimumDaysBetweenRendezvous;
                            const bDaysOverdue: number = b.daysSinceLastRendezvous - b.minimumDaysBetweenRendezvous;
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
                        const daysOverdue: number = item.daysSinceLastRendezvous - item.minimumDaysBetweenRendezvous;
                        const color =  daysOverdue < 0 ? styles.greenBackground: styles.redBackground;
                        return (
                            <View style={styles.itemContainer}>
                                <View style = {styles.friendContainer}>
                                    <View style={[styles.statusBar, color]}>
                                        <Text></Text>
                                    </View>
                                    <View style={styles.friendInfo}>
                                        <Text >Name: {item.name}</Text>
                                        <Text >Days since last rendezvous: {item.daysSinceLastRendezvous}</Text>
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
                        onPress={() => {
                            this._storeData()
                            }
                        }
                        title="Add friend"
                        color="#841584"
                    />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        justifyContent: 'flex-start',
        paddingTop: 50,
        paddingLeft: 30
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'column',
        margin: 1,
        marginTop: 5,
        marginBottom: 5,
    },
    friendContainer: {
        justifyContent: 'center',
        alignItems: 'stretch',
        flexDirection: 'row',
    },
    redBackground: {
        backgroundColor: 'red'
    },
    amberBackground: {
        backgroundColor: 'orange'
    },
    greenBackground: {
        backgroundColor: 'green'
    },
    statusBar: {
        flex: 1,
        width: 10,
    },
    friendInfo: {
        flex: 24,
        paddingLeft: 10,
        marginTop: 10,
        marginBottom: 10
    },
    buttonContainer: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    }
});


