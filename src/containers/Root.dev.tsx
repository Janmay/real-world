import * as React from 'react'
import { Provider } from 'react-redux'
import DevTools from './DevTools'
import { Route } from 'react-router-dom'
import App from './App'
import UserPage from './UserPage'
import RepoPage from './RepoPage'
import { ProviderProps } from 'react-redux'

const Root = ({ store }: ProviderProps) => (
    <Provider store={store}>
        <div>
            <Route path='/' component={App} />
            <Route path="/:login/:name" component={RepoPage} />
            <Route path='/:login' component={UserPage} />
            <DevTools />
        </div>
    </Provider>
)

export default Root