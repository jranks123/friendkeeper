import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from "react-redux";
import {
    clearEditItemStateAction, populateEditItemStateFromFromItem,
    updateDateOfLastAction,
    updateMaximumDaysBetweenActions,
    updateName
} from "../../store/editItems/actions";
import { deleteItem, editItem, refreshState } from "../../store/items/actions";
import { Item } from "../../store/items/types";
import { CombinedState } from "../../store/types";
import { globalStyles } from "../../styles";


interface ItemOptionsPageProps {
    navigateToAddItemForm: () => void,
    items: Item[];
    id: number | null;
    name: string;
    dateOfLastAction: number;
    maximumDaysBetweenActions: string;
    updateName: (name: string) => void;
    updateMaximumDaysBetweenActions: (days: string) => void;
    updateDateOfLastAction: (date: number) => void;
    populateEditItemStateFromFromItem: (item: Item) => void;
    refreshState: () => void;
    clearEditItemState: () => void,
    editItem: (item: Item) => void,
    deleteItem: (id: number) => void,
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
                            props.editItem({...itemFromState, dateOfLastAction: new Date().getTime()});
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

                    <TouchableOpacity
                        onPress={() => {
                            props.deleteItem(props.id);
                            props.refreshState();
                            props.navigation.goBack();
                        }}
                        style={globalStyles.button}
                    >
                        <Text style={globalStyles.buttonText}> Remove friend from list </Text>
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
    updateDateOfLastAction: (date: number) => dispatch(updateDateOfLastAction(date)),
    clearEditItemState: () => dispatch(clearEditItemStateAction()),
    editItem: (item: Item) => dispatch(editItem(item)),
    refreshState: () => dispatch(refreshState()),
    populateEditItemStateFromFromItem: (item: Item) => dispatch(populateEditItemStateFromFromItem(item)),
    deleteItem: (id: number) => dispatch(deleteItem(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ItemOptionsPage);





