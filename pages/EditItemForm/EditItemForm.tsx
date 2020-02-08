import { Notifications } from "expo";
import { LocalNotification } from "expo/build/Notifications/Notifications.types";
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Input } from 'react-native-elements'
import NumericInput from 'react-native-numeric-input'
import { connect } from "react-redux";
import DatePicker from '../../components/ItemListElement/DatePicker/DatePicker';
import {
    updateDateOfLastAction,
    updateMaximumDaysBetweenActions,
    updateName
} from "../../store/editItems/actions";
import { addNewItem, editItem } from "../../store/items/actions";
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
    editItem: (item: Item) => void,
    updateCurrentNotificationId: (id: string) => void,
    navigation: any,
    addItem: (item: Item) => void
}


const localNotification: (Item) => LocalNotification =
    (item: Item) =>  ({
        title: 'Don\'t forget about ' + item.name + '!',
        body: 'You haven\'t seen ' + item.name + ' in ' + item.maximumDaysBetweenActions.toString() + ' days! Give \'em a ring!'});

const EditItemForm = (props: EditItemFormProps) => {

    const setNotification = (): Promise<string> => {


        const daysTilShow = Math.abs(calculateDaysOverdue(props.editItemState.dateOfLastAction, props.editItemState.maximumDaysBetweenActions));
        const time = new Date(new Date().getTime() + (daysTilShow * 60 * 60 * 24 * 1000));
        const schedulingOptions = { time };

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

    const readItemFromEditItemState = (currentNotificationId: string): Item => ({
        // if it is null then this is a new item
        id: props.editItemState.id || getNewIdNumber(props.items),
            name: props.editItemState.name,
            dateOfLastAction: props.editItemState.dateOfLastAction,
            maximumDaysBetweenActions: props.editItemState.maximumDaysBetweenActions,
            currentNotificationId,
    });

    function onPress() {
        setUpNotification().then( currentNotificationId => {
            const item: Item = readItemFromEditItemState(currentNotificationId);
            const index = props.items.findIndex(e => e.id === item.id);
            if (index === -1) {
                props.addItem(item);
            } else {
                props.editItem(item);
            }
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
                    <DatePicker />
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
    addItem: (item: Item) => dispatch(addNewItem(item)),
});


export default connect(mapStateToProps, mapDispatchToProps)(EditItemForm);





