import {EditItemActions, UPDATE_DATE_OF_LAST_ACTION, UPDATE_MAXIMUM_DAYS_BETWEEN_ACTIONS, UPDATE_NAME} from './types'

export function updateName(name: string): EditItemActions {
    return {
        type: UPDATE_NAME,
        name
    }
}
export function updateDateOfLastAction(date: Date): EditItemActions {
    return {
        type: UPDATE_DATE_OF_LAST_ACTION,
        date
    }
}
export function updateMaximumDaysBetweenActions(days: string): EditItemActions {
    return {
        type: UPDATE_MAXIMUM_DAYS_BETWEEN_ACTIONS,
        days
    }
}
