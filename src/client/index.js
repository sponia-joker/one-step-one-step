import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import initStore from '../common/store/initStore'
import { AppContainer } from "react-hot-loader"

import App from '../common/App'

const store = initStore(window.__PRELOADED_STATE__)

const wrapApp = (App, reduxStore) =>(
    <Provider store={reduxStore}>
      <BrowserRouter>
          <AppContainer>
            <App/>
          </AppContainer>
      </BrowserRouter>
    </Provider>
  )


ReactDOM.render(
    wrapApp(App, store),
    document.getElementById('root'),
)
if (module.hot) {
    // flow-disable-next-line
    module.hot.accept('../common/App', () => {
        // eslint-disable-next-line global-require
        const NextApp = require('../common/App').default
        ReactDOM.render(wrapApp(NextApp,store), document.getElementById('root'))
    })
}
