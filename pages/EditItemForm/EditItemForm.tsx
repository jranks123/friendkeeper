import React from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Input } from 'react-native-elements'
import { connect } from "react-redux";
import { globalStyles } from "../../app/styles";
import {
    updateDateOfLastAction,
    updateMaximumDaysBetweenActions,
    updateName
} from "../../store/editItems/actions";
import { editItem } from "../../store/items/actions";
import { Item } from "../../store/items/types";
import { CombinedState } from "../../store/types";
import { getNewIdNumber } from "../../utils/storage";
import { styles } from './styles';

export interface EditItemFormProps {
    items: Item[];
    id: string | null;
    name: string;
    dateOfLastAction: Date;
    maximumDaysBetweenActions: string;
    updateName: (name: string) => void;
    updateMaximumDaysBetweenActions: (days: string) => void;
    updateDateOfLastAction: (date: Date) => void;
    clearEditItemState: () => void,
    editItem: (item: Item) => void
    navigation: any
}

const EditItemForm = (props: EditItemFormProps) => {
        return (
            <ScrollView
                keyboardShouldPersistTaps = "always"
                contentContainerStyle={globalStyles.mainContainer}>
                <Text style={styles.label}>
                    Name of friend
                </Text>
                <Input
                    containerStyle={styles.input}
                    value={props.name}
                    onChangeText={props.updateName}
                />
                <Text style={styles.label}>
                    Maximum days between rendezvous:
                </Text>
                <Input
                    containerStyle={styles.input}
                    value={props.maximumDaysBetweenActions}
                    onChangeText={props.updateMaximumDaysBetweenActions}
                />
                <Text style={styles.label}>
                    Date of last rendezvous
                </Text>
                <DatePicker
                    style={styles.datePicker}
                    date={props.dateOfLastAction} // initial date from state
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
                            marginLeft: 36
                        }
                    }}
                    onDateChange={props.updateDateOfLastAction}
                />
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => {
                                const item: Item = {
                                    // if it is null then this is a new item
                                    id: props.id || getNewIdNumber(props.items),
                                    name: props.name,
                                    dateOfLastAction: props.dateOfLastAction.toString(),
                                    maximumDaysBetweenActions: props.maximumDaysBetweenActions
                                };
                                props.editItem(item);
                                props.navigation.getParam('refreshLandingPageState')();
                                props.navigation.navigate('FriendKeeper');
                        }}
                        title="Add Friend"
                        color="#841584"
                    />
                </View>
            </ScrollView>
        );
    };

const mapStateToProps = (state: CombinedState) => ({
        items: state.itemsState.items,
        id: state.editItemState.id,
        name: state.editItemState.name,
        maximumDaysBetweenActions: state.editItemState.maximumDaysBetweenActions,
        dateOfLastAction: state.editItemState.dateOfLastAction
    });


// tslint:disable-next-line:ban-types
const mapDispatchToProps = (dispatch: Function) =>  ({
    updateName: (name: string) => dispatch(updateName(name)),
    updateMaximumDaysBetweenActions: (name: string) => dispatch(updateMaximumDaysBetweenActions(name)),
    updateDateOfLastAction: (date: Date) => dispatch(updateDateOfLastAction(date)),
    editItem: (item: Item) => dispatch(editItem(item))
});


export default connect(mapStateToProps, mapDispatchToProps)(EditItemForm);





