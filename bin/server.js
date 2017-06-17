require('../server.babel'); // babel registration (runtime transpilation for node)
const path = require('path')
const projectBasePath = path.resolve(__dirname, '..')

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false; // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production'

if (__DEVELOPMENT__) {
  if (!require('piping')({
      hook: true,
      ignore: /(\/\.|~$|\.json|\.scss$)/i
    })) {
        return;
  }
}



var Webpack_isomorphic_tools = require('webpack-isomorphic-tools')

// this must be equal to your Webpack configuration "context" parameter

// this global variable will be used later in express middleware
global.webpack_isomorphic_tools = new Webpack_isomorphic_tools(require('../webpack/webpack.isomorphic.tools.config'))
    // initializes a server-side instance of webpack-isomorphic-tools
    // (the first parameter is the base path for your project
    //  and is equal to the "context" parameter of you Webpack configuration)
    // (if you prefer Promises over callbacks 
    //  you can omit the callback parameter
    //  and then it will return a Promise instead)
    .server(projectBasePath, function() {
        // webpack-isomorphic-tools is all set now.
        // here goes all your web application code:
        // (it must reside in a separate *.js file 
        //  in order for the whole thing to work)
        require('../src/server')
    })
