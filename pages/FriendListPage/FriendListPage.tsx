import React, { Component } from 'react';
import {Button, ScrollView, Text, View} from 'react-native';
import { AsyncStorage } from 'react-native';
import { styles } from './styles';
import { globalStyles } from '../../styles';
import {retrieveItem} from '../../utils/storage';
import FriendList from "../../components/FriendFlatList/FriendList";

interface State {
    names: Friend[];
}

export default class FriendListPage extends Component {

    state: State = { names: [] as Friend[]};

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
                <Text style={styles.title}
                > Overdue: </Text>
                <FriendList
                    names={this.state.names}
                    refreshState={this._refreshState}
                    filterOutIf={(daysOverdue) => daysOverdue <= 0 }
                    navigate={this.props.navigation.navigate}
                >
                </FriendList>

                <Text style={styles.gap}> </Text>
                <Text style={styles.title}> Coming up: </Text>
                <FriendList
                    names={this.state.names}
                    refreshState={this._refreshState}
                    filterOutIf={(daysOverdue) => daysOverdue > 0 }
                    navigate={this.props.navigation.navigate}
                >
                </FriendList>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => {
                            // @ts-ignore
                            this.props.navigation.navigate('AddFriend', {
                                refresh: this._refreshState
                            })
                        }}
                        title="Add Friend"
                        color="#841584"
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => {
                            AsyncStorage.setItem("names", JSON.stringify([]))
                                .then(res => {
                                    this._refreshState()
                                })
                        }}
                        title="Clear all friends"
                        color="#841584"
                    />
                </View>

            </ScrollView>
        );
    }
}


