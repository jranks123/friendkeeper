import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { YellowBox } from 'react-native'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import ItemsList, { ItemListProps } from "../../components/ItemList/ItemList";
import { clearEditItemStateAction } from "../../store/editItems/actions";
import { Item } from "../../store/items/types";
import { CombinedState } from "../../store/types";
import { globalStyles } from '../../styles';
import { styles } from './styles';

YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

interface Props {
    items: Item[],
    deleteAllItems: () => void,
    clearEditItemState: () => void,
    isSwiping: boolean
}

const ItemListComponent = (itemListProps: ItemListProps) => {
    return itemListProps.items.length > 0 ? (<View>
        <ItemsList {...itemListProps}> </ItemsList>
    </View>) : null;
};

const NoItemsCopy = (items: Item[]) => {
    return items.length === 0 ? (
            <View style={globalStyles.centeredTextContainer}>
                <Text
                 style={styles.noFriendsCopy}
                >Add a friend to get started</Text>
            </View>
    ) : null;
};

const ItemListPage = (props: Props) => {
    const { navigate } = useNavigation();
    return (
            <View style={styles.pageContainer}>
                <ScrollView
                    scrollEnabled={!props.isSwiping}
                >
                    {NoItemsCopy(props.items)}
                    <ItemsList />
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={globalStyles.button}
                        onPress={() => {
                            props.clearEditItemState();
                            navigate('Add New Friend')
                        }}
                    >
                        <Text style={globalStyles.buttonText}> Add Friend </Text>
                    </TouchableOpacity>
                </View>
            </View>
    );
};


const mapStateToProps = ( state: CombinedState ) => ({
    items: state.itemsState.items,
    isSwiping: state.landingPageState.isSwiping
});

const mapDispatchToProps = (dispatch) =>  ({
    clearEditItemState: () => dispatch(clearEditItemStateAction()),
});


export default connect(mapStateToProps, mapDispatchToProps)(ItemListPage);


