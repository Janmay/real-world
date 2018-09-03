import * as React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

const store = configureStore()

render(
  <BrowserRouter>
    <Root store={store} />
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
