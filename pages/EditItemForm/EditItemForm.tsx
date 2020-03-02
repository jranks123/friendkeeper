import { useNavigation } from "@react-navigation/native";
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Input } from 'react-native-elements'
import { Avatar } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input'
import { connect } from "react-redux";
import DatePicker from '../../components/DatePicker/DatePicker';
import {
    updateDateOfLastAction, updateImage,
    updateMaximumDaysBetweenActions,
    updateName
} from "../../store/editItems/actions";
import { addNewItem, editItem } from "../../store/items/actions";
import { Item } from "../../store/items/types";
import { CombinedState } from "../../store/types";
import { globalStyles } from "../../styles";
import { pickImage } from "../../utils/imageStorage";
import { setUpNotification } from "../../utils/notifications";
import { getNewIdNumber } from "../../utils/storage";
import { styles } from './styles';

export interface EditItemFormProps {
    items: Item[];
    editItemStateItem: Item,
    updateName: (name: string) => void;
    updateMaximumDaysBetweenActions: (days: number) => void;
    updateDateOfLastAction: (date: number) => void;
    clearEditItemState: () => void,
    editItem: (item: Item) => void,
    updateCurrentNotificationId: (id: string) => void,
    addItem: (item: Item) => void,
    updateImage: (image: string) => void,
}


const EditItemForm = (props: EditItemFormProps) => {
    const { navigate } = useNavigation();


    const readItemFromEditItemState = (currentNotificationId: string): Item => ({
        // if it is null then this is a new item
        id: props.editItemStateItem.id || getNewIdNumber(props.items),
            name: props.editItemStateItem.name,
            dateOfLastAction: props.editItemStateItem.dateOfLastAction,
            maximumDaysBetweenActions: props.editItemStateItem.maximumDaysBetweenActions,
            currentNotificationId,
            image: props.editItemStateItem.image
    });

    function onPress() {
        setUpNotification(props.editItemStateItem).then( currentNotificationId => {
            const item: Item = readItemFromEditItemState(currentNotificationId);
            const index = props.items.findIndex(e => e.id === item.id);
            if (index === -1) {
                props.addItem(item);
            } else {
                props.editItem(item);
            }
            navigate('Friend Keeper');
        });
    }



    return (
        <View style={styles.formContainer}>
            <ScrollView
                keyboardShouldPersistTaps = "always"
                contentContainerStyle={globalStyles.mainContainer}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Avatar source={{ uri: props.editItemStateItem.image }} size="large" rounded />
                    <TouchableOpacity
                        onPress={(_) => pickImage(props.updateImage)}
                    >
                        <Text style={styles.editPhotoText}> Edit </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.form}>
                    <Text style={styles.label} >
                        Name of friend
                    </Text>
                    <Input
                        containerStyle={styles.input}
                        // @ts-ignore
                        textAlign={'center'}
                        value={props.editItemStateItem.name}
                        onChangeText={props.updateName}
                    />

                    <Text style={styles.label}>
                        Maximum days between rendezvous:
                    </Text>
                    <View style={styles.numericInput}>
                        <NumericInput
                            value={props.editItemStateItem.maximumDaysBetweenActions}
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

const mapStateToProps = (state: CombinedState) => {
    return ({
        items: state.itemsState.items,
        editItemStateItem: state.editItemState.item,
    })};


// tslint:disable-next-line:ban-types
const mapDispatchToProps = (dispatch: Function) =>  ({
    updateName: (name: string) => dispatch(updateName(name)),
    updateMaximumDaysBetweenActions: (days: number) => dispatch(updateMaximumDaysBetweenActions(days)),
    updateDateOfLastAction: (date: number) => dispatch(updateDateOfLastAction(date)),
    editItem: (item: Item) => dispatch(editItem(item)),
    addItem: (item: Item) => dispatch(addNewItem(item)),
    updateImage: (image: string) => dispatch(updateImage(image))
});


export default connect(mapStateToProps, mapDispatchToProps)(EditItemForm);





