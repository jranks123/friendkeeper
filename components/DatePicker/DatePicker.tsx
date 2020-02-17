import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from "react-redux";
import {
    updateDateOfLastAction
} from "../../store/editItems/actions";
import { Item } from "../../store/items/types";
import { CombinedState } from "../../store/types";
import { styles } from './styles';

export interface Props {
    updateDateOfLastAction: (date: number) => void,
    editItemState: Item
}

const ItemListElement = (props: Props) => {
    return ( <DateTimePicker
        testID="dateTimePicker"
        timeZoneOffsetInMinutes={0}
        value={new Date(props.editItemState.dateOfLastAction)}
        display="calendar"
        maximumDate={new Date()}
        style={styles.datePicker}
        date={new Date(props.editItemState.dateOfLastAction)} // initial date from state
        mode="date" // The enum of date, datetime and time
        onChange={(event, selectedDate) => {
            props.updateDateOfLastAction(new Date(selectedDate).getTime())
           // setShow(Platform.OS === 'ios' ? true : false);
        }}
    />)
};

const mapStateToProps = (state: CombinedState) => ({
    editItemState: state.editItemState.item,
});


const mapDispatchToProps = (dispatch) =>  ({
    updateDateOfLastAction: (date: number) => dispatch(updateDateOfLastAction(date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemListElement)

