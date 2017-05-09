import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  <App />,
    document.getElementById('root'),
)
if (module.hot) {
    // flow-disable-next-line
  module.hot.accept('./App', () => {
        // eslint-disable-next-line global-require
    const NextApp = require('./App').default
    ReactDOM.render(<NextApp />, document.getElementById('root'))
  })
}
