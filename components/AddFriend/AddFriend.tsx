import React, {Component} from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {Input} from 'react-native-elements'
import {styles} from './styles';
import {globalStyles} from "../../styles";
import {addFriendToData} from "../../utils/storage";

export default class AddFriend extends Component {

    state = {
        name: "",
        dateOfLastRendezvous: null,
        minimumDaysBetweenRendezvous: 0,
    };

    render() {
        return (
            <View style={globalStyles.mainContainer}>
                <Input
                    containerStyle={styles.input}
                    label="Name"
                    onChangeText={(name) => {
                        this.state.name = name
                    }}
                />
                <Input
                    containerStyle={styles.input}
                    label="Minimum days between rendezvous"
                    onChangeText={(mindays) => {
                            this.state.minimumDaysBetweenRendezvous = Number(mindays)
                    }}
                />
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => {
                           const newFriend: Friend = {
                               name: this.state.name,
                               dateOfLastRendezvous: null,
                               minimumDaysBetweenRendezvous:  this.state.minimumDaysBetweenRendezvous
                           };
                           addFriendToData(newFriend).then(()=>{
                               this.props.navigation.goBack();
                           })

                        }}
                        title="Enter deets"
                        color="#841584"
                    />
                </View>

            </View>
        );
    }
}

