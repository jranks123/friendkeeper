import { EvilIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import Swipeable from 'react-native-swipeable-row';
import { Item } from "../store/items/types";
import { calculateDaysOverdue } from "../utils/date";
import { styles } from "./ItemList/styles";
import ItemListElement from "./ItemListElement/ItemListElement";

interface FriendSwipableProps {
    item: Item,
    deleteItem: (id: number) => void,
    setIsSwiping: (isSwiping: boolean) => void,
    navigateToItemOptionsPage: () => void,
    navigateToEditItemOptionsPage: () => void,
}

class ItemSwipable extends React.Component<FriendSwipableProps> {

    swipeable = null;

    handleUserBeganScrollingParentView() {
        this.swipeable.recenter();
    }

    _rightButtons = [
        <TouchableOpacity style={[{
            flex: 1,
            justifyContent: 'center',
            paddingLeft: 20,
            backgroundColor: '#00BCD4'
        }]} onPress={() =>  {
            this.props.navigateToEditItemOptionsPage()
            this.swipeable.recenter();
        }
        }>
            <View style={styles.iconContainer}>
                <EvilIcons name="pencil" size={34} color="white"/>
            </View>
        </TouchableOpacity>,
        <TouchableOpacity style={[{
            flex: 1,
            justifyContent: 'center',
            paddingLeft: 20,
            backgroundColor: '#d14161'
        }]} onPress={() =>  {
            this.props.deleteItem(this.props.item.id)
            this.swipeable.recenter();
        }
        }>
            <View style={styles.iconContainer}>
                <EvilIcons name="trash" size={34} color="white"/>
            </View>
        </TouchableOpacity>
    ];


    render() {
        const daysOverdue: number = calculateDaysOverdue(this.props.item.dateOfLastAction, this.props.item.maximumDaysBetweenActions);
        const onPress = () => {
            this.swipeable.recenter();
            this.props.navigateToItemOptionsPage()
        };

        const { item } = this.props;

        return (
            <Swipeable
                rightButtons={this._rightButtons}
                rightButtonWidth={65}
                style={{marginTop: 5, marginBottom: 5}}
                onSwipeStart={() => this.props.setIsSwiping(true)}
                onSwipeRelease={() => this.props.setIsSwiping(false)}
                onRef={ref => this.swipeable = ref}
            >
                <TouchableOpacity style={[styles.itemListItem]} onPress={() => onPress()}>
                    <ItemListElement item={this.props.item} daysOverdue={daysOverdue}/>
                </TouchableOpacity>
            </Swipeable>
        );
    }
}

export default ItemSwipable;