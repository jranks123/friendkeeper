import React from 'react';
import {Button, ScrollView, Text, View} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {Input} from 'react-native-elements'
import {styles} from './styles';
import {globalStyles} from "../../styles";
import {getNewIdNumber} from "../../utils/storage";
import {Item, ItemsState} from "../../store/items/types";
import {connect} from "react-redux";
import {NavigationParams} from "react-navigation";


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export interface Props {
    items: Item[];
    item: Item;
}

const AddItem = () => {
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
                                const item: Item = {
                                    id: getNewIdNumber(this.state.items),
                                    name: this.state.friend.name,
                                    dateOfLastAction: this.state.friend.dateOfLastRendezvous.toString(),
                                    maximumDaysBetweenActions: this.state.friend.maximumDaysBetweenRendezvous.toString()
                                };
                                console.log(item)

                                // call dispatch function
                                // addFriendToData(newFriend).then(() => {
                                //     // @ts-ignore
                                //     this.props.navigation.goBack();
                                // })
                        }}
                        title="Add Friend"
                        color="#841584"
                    />
                </View>
            </ScrollView>
        );
    };

const mapStateToProps = ( state: ItemsState ) => ({
    items: state.items
});

export default connect(mapStateToProps)(AddItem);





