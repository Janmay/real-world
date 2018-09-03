import { union } from 'lodash'

interface Paginate {
    types: string[];
    mapActionToKey: (action: object) => string;
}

interface Action {
    type: string;
    response: {
        result: string[];
        nextPageUrl: string;
    }
}

const paginate = ({ types, mapActionToKey }: Paginate) => {
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected types to be an array of three elements.')
    }
    if (!types.every(t => typeof t === 'string')) {
        throw new Error('Expected types to be strings.')
    }
    if (typeof mapActionToKey !== 'function') {
        throw new Error('Expected mapActionToKey to be a function')
    }

    const [requestType, successType, failureType] = types

    const updatePagination = (state = {
        ids: [],
        isFetching: false,
        nextPageUrl: undefined,
        pageCount: 0
    }, action: Action) => {
        switch (action.type) {
            case requestType:
                return {
                    ...state,
                    isFetching: true
                }
            case successType:
                return {
                    ...state,
                    ids: action.response
                        ? union(state.ids, action.response.result)
                        : state.ids,
                    isFetching: false,
                    nextPageUrl: action.response && action.response.nextPageUrl,
                    pageCount: state.pageCount + 1
                }
            case failureType:
                return {
                    ...state,
                    isFetching: false
                }
            default:
                return state
        }
    }

    return (state = {}, action: Action) => {
        switch (action.type) {
            case requestType:
            case successType:
            case failureType:
                const key = mapActionToKey(action)
                if (typeof key !== 'string') {
                    throw new Error('Expected key to be a string')
                }
                return {
                    ...state,
                    [key]: updatePagination(state[key], action)
                }
            default:
                return state
        }
    }
}

export default paginate