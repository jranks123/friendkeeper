import { useNavigation } from '@react-navigation/native';
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
import { setNotification } from "../../utils/notifications";


interface ItemOptionsPageProps {
    navigateToAddItemForm: () => void,
    items: Item[];
    editItemStateItem: Item;
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
            id: props.editItemStateItem.id,
            name: props.editItemStateItem.name,
            dateOfLastAction: props.editItemStateItem.dateOfLastAction,
            maximumDaysBetweenActions: props.editItemStateItem.maximumDaysBetweenActions,
            currentNotificationId: props.editItemStateItem.currentNotificationId,
            image: props.editItemStateItem.image,
        };
        const navigation = useNavigation();
        return (
                <View style={globalStyles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            const updatedItem = {...itemFromState, dateOfLastAction: new Date().getTime()};
                            props.editItem(updatedItem);
                            setNotification(updatedItem).then(res => console.log(`set notification ${res}`));
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
                            props.deleteItem(props.editItemStateItem.id);
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
        editItemStateItem: state.editItemState.item,
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





