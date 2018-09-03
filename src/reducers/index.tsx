import * as ActionTypes from '../actions';
import * as constants from '../constants';
import { combineReducers } from 'redux';
import paginate from './paginate';
import { STARRED_REQUEST, STARRED_SUCCESS, STARRED_FAILURE } from '../constants';
import { merge } from 'lodash'

export interface EntitiesState {
    readonly users: object;
    readonly repos: object;
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

// Updates an entity cache in response to any action with response.entities.
const entities = (state: EntitiesState = { users: {}, repos: {} }, action: {response?: {entities?: object}}) => {
    if (action.response && action.response.entities) {
        return merge({}, state, action.response.entities)
    }

    return state
}

// Updates error message to notify about the failed fetches.
const errorMessage = (state = null, { type, error }: ActionTypes.ResetErrorMessage) => {
    if (type === constants.RESET_ERROR_MESSAGE) {
        return null
    } else if (error) {
        return error
    }

    return state
}

// Updates the pagination data for different actions.
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
    entities,
    errorMessage,
    pagination
})

export default rootReducer