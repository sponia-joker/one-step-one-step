import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Helmet from 'react-helmet'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'
import initStore from '../common/store/initStore'
import Html from './Html'
import App from '../common/App'


const renderFullPage = (appComponent, store) => {

    // if (__DEVELOPMENT__) {
    //     webpack_isomorphic_tools.refresh()
    // }
    return ('<!doctype html>\n' +
        ReactDOMServer.renderToString(<Html component={appComponent} store={store}/>))
}

const renderApp = (location, plainPartialState, routerContext = {}) => {
    const store = initStore(plainPartialState)
    const appComponent = (
        <Provider store={store} key='provider'>
          <StaticRouter location={location} context={routerContext}>
             <App />
           </StaticRouter>
         </Provider>
      )
    return renderFullPage(appComponent, store)
}
export default renderApp
