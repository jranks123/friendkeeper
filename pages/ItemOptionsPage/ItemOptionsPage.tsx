import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from "react-redux";
import {
    clearEditItemStateAction, populateEditItemStateFromFromItem,
    updateDateOfLastAction,
    updateMaximumDaysBetweenActions,
    updateName
} from "../../store/editItems/actions";
import { deleteItem, editItem } from "../../store/items/actions";
import { Item } from "../../store/items/types";
import { CombinedState } from "../../store/types";
import { globalStyles } from "../../styles";
import { useNavigation } from '@react-navigation/native';


interface ItemOptionsPageProps {
    navigateToAddItemForm: () => void,
    items: Item[];
    editItemState: Item;
    updateName: (name: string) => void;
    updateMaximumDaysBetweenActions: (days: number) => void;
    updateDateOfLastAction: (date: number) => void;
    populateEditItemStateFromFromItem: (item: Item) => void;
    clearEditItemState: () => void,
    editItem: (item: Item) => void,
    deleteItem: (id: number) => void,
}

const ItemOptionsPage = (props: ItemOptionsPageProps) => {

        const itemFromState: Item = {
            id: props.editItemState.id,
            name: props.editItemState.name,
            dateOfLastAction: props.editItemState.dateOfLastAction,
            maximumDaysBetweenActions: props.editItemState.maximumDaysBetweenActions,
            currentNotificationId: props.editItemState.currentNotificationId,
        };
        const navigation = useNavigation();
        return (
                <View style={globalStyles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            props.editItem({...itemFromState, dateOfLastAction: new Date().getTime()});
                            navigation.goBack();
                        }}
                        style={globalStyles.button}
                    >
                        <Text style={globalStyles.buttonText}> I saw them today </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            props.populateEditItemStateFromFromItem({...itemFromState});
                            navigation.navigate('Edit Friend')}
                        }
                        style={globalStyles.button}
                    >
                        <Text style={globalStyles.buttonText}> Edit friend manually </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            props.deleteItem(props.editItemState.id);
                            navigation.goBack();
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
        editItemState: state.editItemState.item,
    });


const mapDispatchToProps = (dispatch) =>  ({
    updateName: (name: string) => dispatch(updateName(name)),
    updateMaximumDaysBetweenActions: (days: number) => dispatch(updateMaximumDaysBetweenActions(days)),
    updateDateOfLastAction: (date: number) => dispatch(updateDateOfLastAction(date)),
    clearEditItemState: () => dispatch(clearEditItemStateAction()),
    editItem: (item: Item) => dispatch(editItem(item)),
    populateEditItemStateFromFromItem: (item: Item) => dispatch(populateEditItemStateFromFromItem(item)),
    deleteItem: (id: number) => dispatch(deleteItem(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ItemOptionsPage);





