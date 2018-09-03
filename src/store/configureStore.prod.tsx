import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import api from '../middleware/api'
import { createLogger } from 'redux-logger'
import rootReducer, { StoreState } from '../reducers'

const configureStore = (preloadedState: StoreState) => {
    const store = createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(thunk, api, createLogger())
    )

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            store.replaceReducer(rootReducer)
        })
    }

    return store
}

export default configureStore