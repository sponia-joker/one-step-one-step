import { applyMiddleware, createStore, compose } from 'redux'
import thunk from './middleware/thunk'
import promiseMiddleware from 'redux-promise-middleware'
import request from '../tools/request'
import reducers from './reducers'
import { createLogger } from 'redux-logger'

export default (initialState = {}) => {
    const middleware = [
        thunk(request),
        promiseMiddleware({ promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR'] }),
        createLogger({
            collapsed: false
        })
    ]
    const enhancers = []

    let composeEnhancers = compose

    if (__DEVELOPMENT__&&__CLIENT__) {
        const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        if (typeof composeWithDevToolsExtension === 'function') {
            composeEnhancers = composeWithDevToolsExtension
        }
    }

    const store = createStore(
        reducers,
        initialState,
        composeEnhancers(
            applyMiddleware(...middleware),
            ...enhancers
        )
    )

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const reducers = require('./reducers').default
            store.replaceReducer(reducers)
        })
    }

    return store
}
