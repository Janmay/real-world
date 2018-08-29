import * as React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Root from './containers/Root'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
