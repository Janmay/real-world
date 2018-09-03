import * as ActionTypes from '../actions';
import * as constants from '../constants';
import { combineReducers } from 'redux';
import paginate from './paginate';
import { STARRED_REQUEST, STARRED_SUCCESS, STARRED_FAILURE } from '../constants';

export interface EntitiesState {
    readonly users?: object;
    readonly repos?: object;
}

export interface PaginationState {
    readonly starredByUser: object;
    readonly stargazersByRepo: object;
}

export interface StoreState {
    errorMessage: string | null;
    entities: EntitiesState;
    pagination: PaginationState;
}

const errorMessage = (state = null, { type, error }: ActionTypes.ResetErrorMessage) => {
    if (type === constants.RESET_ERROR_MESSAGE) {
        return null
    } else if (error) {
        return error
    }

    return state
}

const pagination = combineReducers({
    starredByUser: paginate({
        mapActionToKey: (action: {login: string}) => action.login,
        types: [
            STARRED_REQUEST,
            STARRED_SUCCESS,
            STARRED_FAILURE
        ]
    })
})

const rootReducer = combineReducers({
    errorMessage,
    pagination
})

export default rootReducer