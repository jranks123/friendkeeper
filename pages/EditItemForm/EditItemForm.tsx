import { Notifications } from "expo";
import { LocalNotification } from "expo/build/Notifications/Notifications.types";
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Input } from 'react-native-elements'
import NumericInput from 'react-native-numeric-input'
import { connect } from "react-redux";
import {
    updateCurrentNotificationId,
    updateDateOfLastAction,
    updateMaximumDaysBetweenActions,
    updateName
} from "../../store/editItems/actions";
import { editItem, refreshState } from "../../store/items/actions";
import { Item } from "../../store/items/types";
import { CombinedState } from "../../store/types";
import { globalStyles } from "../../styles";
import { calculateDaysOverdue } from "../../utils/date";
import { getNewIdNumber } from "../../utils/storage";
import { styles } from './styles';

export interface EditItemFormProps {
    items: Item[];
    editItemState: Item,
    updateName: (name: string) => void;
    updateMaximumDaysBetweenActions: (days: number) => void;
    updateDateOfLastAction: (date: number) => void;
    clearEditItemState: () => void,
    refreshState: () => void,
    editItem: (item: Item) => void,
    updateCurrentNotificationId: (id: string) => void,
    navigation: any
}


const localNotification: (Item) => LocalNotification =
    (item: Item) =>  ({
        title: 'Don\'t forget about ' + item.name + '!',
        body: 'You haven\'t seen ' + item.name + ' in ' + item.maximumDaysBetweenActions.toString() + ' days! Give \'em a ring!'});

const EditItemForm = (props: EditItemFormProps) => {

    const setNotification = (): Promise<string> => {

        const daysTilShow = Math.abs(calculateDaysOverdue(props.editItemState.dateOfLastAction, props.editItemState.maximumDaysBetweenActions));
        const schedulingOptions = {
            time: new Date().getTime() + (daysTilShow * 60 * 60 * 24) ,
        };

        return Notifications.scheduleLocalNotificationAsync(
            localNotification(props.editItemState),
            schedulingOptions,
        ).then(id => {
            return id.toString()
        });
    };

    const cancelNotification = (id: string | null): Promise<void> => {
        return id ? Notifications.cancelScheduledNotificationAsync(id) : Promise.resolve()
    };

    const setUpNotification = (): Promise<string> => {
        return cancelNotification(props.editItemState.currentNotificationId).then(_ => {
            console.log("Dismissed notification");
            return setNotification();
        }).catch(err => {
            console.log(err + ". The notiication has probably already been shown.");
            return setNotification();
        });
    };

    function onPress() {
        setUpNotification().then( id =>{
            const item: Item = {
                // if it is null then this is a new item
                id: props.editItemState.id || getNewIdNumber(props.items),
                name: props.editItemState.name,
                dateOfLastAction: props.editItemState.dateOfLastAction,
                maximumDaysBetweenActions: props.editItemState.maximumDaysBetweenActions,
                currentNotificationId: id,
            };

            props.editItem(item);
            props.refreshState();
            props.navigation.navigate('FriendKeeper');
        });

    }


    return (
        <View style={styles.formContainer}>
            <ScrollView
                keyboardShouldPersistTaps = "always"
                contentContainerStyle={globalStyles.mainContainer}>
                <View style={styles.form}>
                    <Text style={styles.label} >
                        Name of friend
                    </Text>
                    <Input
                        containerStyle={styles.input}
                        // @ts-ignore
                        textAlign={'center'}
                        value={props.editItemState.name}
                        onChangeText={props.updateName}
                    />

                    <Text style={styles.label}>
                        Maximum days between rendezvous:
                    </Text>
                    <View style={styles.numericInput}>
                        <NumericInput
                            value={props.editItemState.maximumDaysBetweenActions}
                            onChange={props.updateMaximumDaysBetweenActions}
                            totalWidth={180}
                            totalHeight={50}
                            iconSize={25}
                            step={1}
                            valueType='real'
                            rounded
                            // @ts-ignore
                            iconStyle={{ color: 'white' }}
                            rightButtonBackgroundColor='#00BCD4'
                            leftButtonBackgroundColor='#00BCD4'/>
                    </View>
                    <Text style={styles.label}>
                        Date of last rendezvous
                    </Text>
                    <DatePicker
                        style={styles.datePicker}
                        date={new Date(props.editItemState.dateOfLastAction)} // initial date from state
                        mode="date" // The enum of date, datetime and time
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

                            }
                        }}
                        onDateChange={(dateString: string) => {
                            props.updateDateOfLastAction(new Date(dateString).getTime())
                        }}
                    />
                </View>
            </ScrollView>
            <View style={styles.bottom}>
                <TouchableOpacity
                    onPress={onPress}
                    style={globalStyles.button}
                >
                    <Text style={globalStyles.buttonText}>
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
        );
    };

const mapStateToProps = (state: CombinedState) => ({
        items: state.itemsState.items,
        editItemState: state.editItemState.item,
    });


// tslint:disable-next-line:ban-types
const mapDispatchToProps = (dispatch: Function) =>  ({
    updateName: (name: string) => dispatch(updateName(name)),
    updateMaximumDaysBetweenActions: (days: number) => dispatch(updateMaximumDaysBetweenActions(days)),
    updateDateOfLastAction: (date: number) => dispatch(updateDateOfLastAction(date)),
    editItem: (item: Item) => dispatch(editItem(item)),
    refreshState: () => dispatch(refreshState()),
    updateCurrentNotificationId: (id: string) => dispatch(updateCurrentNotificationId(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(EditItemForm);





