import {
    ADD_NEW_ITEM,
    DELETE_ALL_ITEMS,
    DELETE_ITEM,
    EDIT_ITEM,
    Item,
    ItemsActions,
    ItemsState,
    REFRESH_PAGE
} from "./types";

const initialState: ItemsState = {
    items: [],
    lastRefreshDate: new Date(),
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
                ...state,
                items: pushToArray(state.items, action.item)
            };
        case EDIT_ITEM:
            return {
                ...state,
                items: pushToArray(state.items, action.item)
            };
        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(
                    item => item.id !== action.itemId
                )
            };
        case REFRESH_PAGE:
            return {
                ...state,
                lastRefreshDate: new Date
            };
        case DELETE_ALL_ITEMS:
            return {
                ...state,
                items: []
            };
        default:
            return state;
    }
}

