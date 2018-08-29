import * as ActionTypes from '../actions';
import * as constants from '../constants';
import { combineReducers } from 'redux';

export interface ErrorMessageState {
    readonly errorMessage: string | null
}

export type StoreState = ErrorMessageState | null

const errorMessage = (state: StoreState, { type, error }: ActionTypes.ResetErrorMessage) => {
    if (type === constants.RESET_ERROR_MESSAGE) {
        return null
    } else if (error) {
        return error
    }

    return state
}

const rootReducer = combineReducers({
    errorMessage
})

export default rootReducer