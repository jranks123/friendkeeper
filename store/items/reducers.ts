import {ADD_NEW_ITEM, DELETE_ALL_ITEMS, DELETE_ITEM, EDIT_ITEM, Item, ItemsActions, ItemsState} from "./types";

const initialState: ItemsState = {
    items: []
};

function pushToArray(items: Item[], item: Item) {
    const index = items.findIndex((e) => e.id === item.id);
    if (index === -1) {
        items.push(item);
    } else {
        items[index] = item;
    }
    return items;
}

export function itemsReducer(
    state = initialState,
    action: ItemsActions
): ItemsState {
    switch (action.type) {
        case ADD_NEW_ITEM:
            return {
                items: pushToArray(state.items, action.item)
            };
        case EDIT_ITEM:
            return {
                items: pushToArray(state.items, action.item)
            };
        case DELETE_ITEM:
            return {
                items: state.items.filter(
                    item => item.id !== action.itemId
                )
            };
        case DELETE_ALL_ITEMS:
            return {
                items: []
            };
        default:
            return state;
    }
}

