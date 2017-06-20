import React, { Component } from 'react'
import ReactDOMServer from 'react-dom/server'
import serialize from 'serialize-javascript'
import PropTypes from 'prop-types'


class Html extends Component {

    static propTypes = {
            // assets: PropTypes.object,
            // component: PropTypes.object,
            // store: PropTypes.object
    }
        // a sidenote for "advanced" users:
        // (you may skip this)
        //
        // this file is usually not included in your Webpack build
        // because this React component is only needed for server side React rendering.
        //
        // so, if this React component is not `require()`d from anywhere in your client code,
        // then Webpack won't ever get here 
        // which means Webpack won't detect and parse any of the `require()` calls here,
        // which in turn means that if you `require()` any unique assets here 
        // you should also `require()` those assets somewhere in your client code,
        // otherwise those assets won't be present in your Webpack bundle and won't be found.
        //
    render() {
        const { assets, component, store } = this.props

        // "import" will work here too 
        // but if you want hot reloading to work while developing your project
        // then you need to use require()
        // because import will only be executed a single time 
        // (when the application launches)
        // you can refer to the "Require() vs import" section for more explanation
        // const picture = require('../assets/images/cat.jpg')

        // favicon
        // const icon = require('../assets/images/icon/32x32.png')

        const html =
            (
              <html lang="en-us">
              <head>
                <meta charSet="utf-8"/>
                <title>快体育</title>

                <link href='/style.css' media="screen, projection" rel="stylesheet" type="text/css"/>
              </head>
              <body>
                {/* image requiring demonstration */}
                {/*<img src={picture}/>*/}

                {/* rendered React page */}
                <div id="root" dangerouslySetInnerHTML={{__html: ReactDOMServer.renderToString(component)}}/>

                {/* Flux store data will be reloaded into the store on the client */}
                <script dangerouslySetInnerHTML={{__html: `window.__PRELOADED_STATE__=${serialize(store.getState())};`}} />
                <script src='/vendor.js'/>
                <script src='/main.js'/>
              </body>
            </html>
            )
        return html
    }
}
export default Html
