import React from 'react';
import DatePicker from 'react-native-datepicker';
import { connect } from "react-redux";
import {
    updateDateOfLastAction
} from "../../../store/editItems/actions";
import { CombinedState } from "../../../store/types";
import { Item } from "../../../store/items/types";
import { styles } from './styles';

export interface Props {
    updateDateOfLastAction: (date: number) => void,
    editItemState: Item
}

const ItemListElement = (props: Props) => {
    return ( <DatePicker
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
    />)
};

const mapStateToProps = (state: CombinedState) => ({
    editItemState: state.editItemState.item,
});


const mapDispatchToProps = (dispatch) =>  ({
    updateDateOfLastAction: (date: number) => dispatch(updateDateOfLastAction(date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemListElement)

