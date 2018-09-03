import * as constants from '../constants';
import { Schemas } from '../middleware/api';
import { Dispatch } from 'redux';
import { StoreState } from '../reducers/index';
import { CALL_API } from '../constants/index';

export interface ResetErrorMessage {
    type: constants.RESET_ERROR_MESSAGE;
    error?: string
}

export const resetErrorMessage = (): ResetErrorMessage => ({
    type: constants.RESET_ERROR_MESSAGE
})

// Fetch a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js
const fetchUser = (login: string) => ({
    [constants.CALL_API]: {
        endpoint: `users/${login}`,
        schema: Schemas.USER,
        types: [constants.USER_REQUEST, constants.USER_SUCCESS, constants.USER_FAILURE]
    }
})

// Fetches a single user from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export const loadUser = (login: string, requiredFields: string[] = []) => (dispatch: Dispatch<any>, getState: () => StoreState) => {
    const user = getState().entities.users![login]
    if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
        return null
    }

    return dispatch(fetchUser(login))
}

// Fetches a single repository from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchRepo = (fullName: string) => ({
    [CALL_API]: {
        endpoint: `repos/${fullName}`,
        schema: Schemas.REPO,
        types: [constants.REPO_REQUEST, constants.REPO_SUCCESS, constants.REPO_FAILURE]
    }
})

export const loadRepo = (fullName: string, requiredFields: string[] = []) => (dispatch: Dispatch<any>, getState: () => StoreState) => {
    const repo = getState().entities.repos![fullName]
    if (repo && requiredFields.every(key => repo.hasOwnProperty(key))) {
        return null
    }

    return dispatch(fetchRepo(fullName))
}

const fetchStarred = (login: string, nextPageUrl: string) => ({
    login,
    [CALL_API]: {
        endpoint: nextPageUrl,
        schema: Schemas.REPO_ARRAY,
        types: [constants.STARRED_REQUEST, constants.STARRED_SUCCESS, constants.STARRED_FAILURE]
    }
})

export const loadStarred = (login: string, nextPage: boolean = false) => (dispatch: Dispatch<any>, getState: () => StoreState) => {
    const {
        nextPageUrl = `users/${login}/starred`,
        pageCount = 0
    } = getState().pagination.starredByUser[login] || {}

    if (pageCount > 0 && !nextPage) {
        return null
    }

    return dispatch(fetchStarred(login, nextPageUrl))
}