import React, { Component } from 'react';
import { Button, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Input } from 'react-native-elements'
import { styles } from './styles';
import { globalStyles } from "../../styles";
import { addFriendToData } from "../../utils/storage";
import { getTodaysDateString } from "../../utils/date";


export default class FriendInfo extends Component {


    state = {
            name: "",
            dateOfLastRendezvous: new Date(),
            minimumDaysBetweenRendezvous: "",
            dateInDatepicker: new Date(),
    };


    render() {
        return (
            <ScrollView contentContainerStyle={globalStyles.mainContainer}>
                <Input
                    containerStyle={styles.input}
                    label="Task"
                    onChangeText={(name) => {
                        this.setState({
                            ...this.state,
                            name: name
                        })
                    }}
                />
                <Input
                    containerStyle={styles.input}
                    label="Max days without doing task "
                    onChangeText={(mindays) => {
                        this.setState({
                            ...this.state,
                            minimumDaysBetweenRendezvous:  Number(mindays)
                        });

                    }}
                />
                <Text> Start counting from </Text>
                <DatePicker
                    style={{width: 200}}
                    date={this.state.dateInDatepicker} //initial date from state
                    mode="date" //The enum of date, datetime and time
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="1991-01-01"
                    maxDate={getTodaysDateString()}
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
                        this.setState({dateInDatepicker: date})
                        }
                    }
                />
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => {
                           const newFriend: Friend = {
                               name: this.state.name,
                               dateOfLastRendezvous: this.state.dateInDatepicker.toString(),
                               minimumDaysBetweenRendezvous:  this.state.minimumDaysBetweenRendezvous.toString()
                           };
                           addFriendToData(newFriend).then(()=>{
                               this.props.navigation.goBack();
                           })

                        }}
                        title="Submit task"
                        color="#841584"
                    />
                </View>

            </ScrollView>
        );
    }
}

