import React, { Component } from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'
import Helmet from 'react-helmet'
import projectConfig from '../../project.config'
const appName = projectConfig.appName
import Home from './scenes/Home'
import './styles/core.scss'

class App extends Component {
    render() {
        return (
          <div className="app">
            <Helmet titleTemplate={`%s | ${appName}`} defaultTitle={appName} />
            {/*<Nav />*/}
            <Switch>
              <Route exact path="/" render={() => <Home />} />
              <Route path="/home" render={() => <Home />} />
            </Switch>
        </div>
        )
    }
}

export default App
