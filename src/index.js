import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import initStore from './store/initStore'

import App from './App'

const store = initStore()

const wrapApp = (AppComponent, reduxStore) =>
    <Provider store={reduxStore}>
      <BrowserRouter>
          <AppComponent />
      </BrowserRouter>
  </Provider>


ReactDOM.render(
    wrapApp(App, store),
    document.getElementById('root'),
)
if (module.hot) {
    // flow-disable-next-line
    module.hot.accept('./App', () => {
        // eslint-disable-next-line global-require
        const NextApp = require('./App').default
        ReactDOM.render(wrapApp(NextApp,store), document.getElementById('root'))
    })
}
