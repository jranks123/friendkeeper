import React from 'react';
import {Button, ScrollView, Text, View} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {Input} from 'react-native-elements'
import {styles} from './styles';
import {globalStyles} from "../../styles";
import {addFriendToData, getNewIdNumber} from "../../utils/storage";


export interface Props {
    friend: Friend | null;
}

export interface State {
    friend: Friend
}

export default class AddFriend extends React.Component<Props, State> {


    constructor(props) {
        super(props);


        this.state = { friend: this.props.navigation.getParam("friend") || {name: "", dateOfLastRendezvous: new Date(), maximumDaysBetweenRendezvous: ""} };
    }


    render() {

        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }

        return (
            <ScrollView
                keyboardShouldPersistTaps = "always"
                contentContainerStyle={globalStyles.mainContainer}>
                <Text style={styles.label}>
                    Name of friend
                </Text>
                <Input
                    containerStyle={styles.input}
                    value={this.state.friend.name}
                    onChangeText={(name) => {
                        this.setState({
                            ...this.state,
                            friend: {
                                ...this.state.friend,
                                name: name
                            }
                        })
                    }}
                />
                <Text style={styles.label}>
                    Maximum days between rendezvous:
                </Text>
                <Input
                    containerStyle={styles.input}
                    value={this.state.friend.maximumDaysBetweenRendezvous}
                    onChangeText={(mindays) => {
                        this.setState({
                            ...this.state,
                            friend: {
                                ...this.state.friend,
                                maximumDaysBetweenRendezvous: mindays
                            }
                        })

                    }}
                />
                <Text style={styles.label}>
                    Date of last rendezvous
                </Text>
                <DatePicker
                    style={styles.datePicker}
                    date={new Date(Date.parse(this.state.friend.dateOfLastRendezvous))} //initial date from state
                    mode="date" //The enum of date, datetime and time
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="1991-01-01"
                    maxDate={"2091-01-01"}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                    }}
                    onDateChange={(date) => {

                        this.setState( {...this.state,
                            friend: {
                        ...this.state.friend,
                                dateOfLastRendezvous: date
                        }})
                    }
                    }
                />
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => {
                            getNewIdNumber().then(newId => {
                                const newFriend: Friend = {
                                    id: this.state.friend.id || newId,
                                    name: this.state.friend.name,
                                    dateOfLastRendezvous: this.state.friend.dateOfLastRendezvous.toString(),
                                    maximumDaysBetweenRendezvous: this.state.friend.maximumDaysBetweenRendezvous.toString()
                                };
                                addFriendToData(newFriend).then(() => {
                                    // @ts-ignore
                                    this.props.navigation.goBack();
                                })
                            });
                        }}
                        title="Add Friend"
                        color="#841584"
                    />
                </View>
            </ScrollView>
        );
    }
}

