import React from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { connect } from "react-redux";
import {
    clearEditItemStateAction, populateEditItemStateFromFromItem,
    updateDateOfLastAction,
    updateMaximumDaysBetweenActions,
    updateName
} from "../../store/editItems/actions";
import { editItem, refreshState } from "../../store/items/actions";
import { Item } from "../../store/items/types";
import { CombinedState } from "../../store/types";
import { styles } from './styles';
import { globalStyles } from "../../styles";


interface ItemOptionsPageProps {
    navigateToAddItemForm: () => void,
    items: Item[];
    id: number | null;
    name: string;
    dateOfLastAction: Date;
    maximumDaysBetweenActions: string;
    updateName: (name: string) => void;
    updateMaximumDaysBetweenActions: (days: string) => void;
    updateDateOfLastAction: (date: Date) => void;
    populateEditItemStateFromFromItem: (item: Item) => void;
    refreshState: () => void;
    clearEditItemState: () => void,
    editItem: (item: Item) => void
    navigation: any
}

const ItemOptionsPage = (props: ItemOptionsPageProps) => {

        const itemFromState = {
            id: props.id,
            name: props.name,
            dateOfLastAction: props.dateOfLastAction,
            maximumDaysBetweenActions: props.maximumDaysBetweenActions
        };

        return (
                <View style={globalStyles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            props.editItem({...itemFromState, dateOfLastAction: new Date()});
                            props.refreshState();
                            props.navigation.goBack();
                        }}
                        style={globalStyles.button}
                    >
                        <Text style={globalStyles.buttonText}> I saw them today </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            props.populateEditItemStateFromFromItem({...itemFromState})
                            props.navigation.navigate('EditFriend')}
                        }
                        style={globalStyles.button}
                    >
                        <Text style={globalStyles.buttonText}> Edit friend manually </Text>
                    </TouchableOpacity>
                </View>
        )
    };

const mapStateToProps = (state: CombinedState) => ({
        items: state.itemsState.items,
        id: state.editItemState.id,
        name: state.editItemState.name,
        maximumDaysBetweenActions: state.editItemState.maximumDaysBetweenActions,
        dateOfLastAction: state.editItemState.dateOfLastAction
    });


const mapDispatchToProps = (dispatch) =>  ({
    updateName: (name: string) => dispatch(updateName(name)),
    updateMaximumDaysBetweenActions: (name: string) => dispatch(updateMaximumDaysBetweenActions(name)),
    updateDateOfLastAction: (date: Date) => dispatch(updateDateOfLastAction(date)),
    clearEditItemState: () => dispatch(clearEditItemStateAction()),
    editItem: (item: Item) => dispatch(editItem(item)),
    refreshState: () => dispatch(refreshState()),
    populateEditItemStateFromFromItem: (item: Item) => dispatch(populateEditItemStateFromFromItem(item)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ItemOptionsPage);





