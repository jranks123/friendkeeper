import React from 'react';
import { Button, View } from 'react-native';
import { connect } from "react-redux";
import {
    clearEditItemStateAction,
    updateDateOfLastAction,
    updateMaximumDaysBetweenActions,
    updateName
} from "../../store/editItems/actions";
import { editItem, refreshPage } from "../../store/items/actions";
import { Item } from "../../store/items/types";
import { CombinedState } from "../../store/types";
import { styles } from './styles';


interface ItemOptionsPageProps {
    navigateToAddItemForm: () => void,
    items: Item[];
    id: string | null;
    name: string;
    dateOfLastAction: Date;
    maximumDaysBetweenActions: string;
    updateName: (name: string) => void;
    updateMaximumDaysBetweenActions: (days: string) => void;
    updateDateOfLastAction: (date: Date) => void;
    refreshPage: () => void;
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

                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => {
                            props.editItem({...itemFromState, dateOfLastAction: new Date().toString()});
                            props.refreshPage();
                            props.navigation.goBack();
                        }}
                        title="I saw them today"
                        color="#841584"
                    />
                    <Button
                        onPress={() => {
                            props.navigation.navigate('EditFriend')}
                        }
                        title="Edit friend manually"
                        color="#841584"
                    />
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
    refreshPage: () => dispatch(refreshPage()),
});


export default connect(mapStateToProps, mapDispatchToProps)(ItemOptionsPage);





