// Describing the shape of the friend slice of state

export interface Item  {
    id: string | null,
    name: string;
    dateOfLastAction: string | null;
    maximumDaysBetweenActions: string;
}

export interface ItemsState {
    items: Item[];
}

// Describing the different ACTION NAMES available

export const ADD_NEW_ITEM = 'ADD_NEW_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const DELETE_ALL_ITEMS = 'DELETE_ALL_ITEMS';

interface AddNewItemAction {
    type: typeof ADD_NEW_ITEM
    item: Item
}

interface EditItemAction {
    type: typeof EDIT_ITEM
    item: Item
}

interface DeleteItemAction {
    type: typeof DELETE_ITEM
    itemId: string
}


interface DeleteAllItemsAction {
    type: typeof DELETE_ALL_ITEMS
}


export type ItemsActions = AddNewItemAction | EditItemAction | DeleteItemAction | DeleteAllItemsAction
