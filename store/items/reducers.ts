import {
  ADD_NEW_ITEM,
  DELETE_ALL_ITEMS,
  DELETE_ITEM,
  EDIT_ITEM,
  Item,
  ItemsActions,
  ItemsState,
} from "./types";

const initialState: ItemsState = {
  items: []
};

function pushToArray(items: Item[], item: Item): Item[] {
  return [...items, item]
}

export function itemsReducer(
  state = initialState,
  action: ItemsActions
): ItemsState {
  switch (action.type) {
    case ADD_NEW_ITEM:
      return {
        ...state,
        items: [...state.items, action.item]
      };
    case EDIT_ITEM:
      return {
        ...state,
        items: state.items.map(
            item => (item.id === action.item.id) ? {
                  ...item,
                  name: action.item.name,
                  maximumDaysBetweenActions: action.item.maximumDaysBetweenActions,
                  dateOfLastAction: action.item.dateOfLastAction, currentNotificationId: action.item.currentNotificationId
                } : item)
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.itemId)
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
