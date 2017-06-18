import React, { Component } from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'
import Helmet from 'react-helmet'
import projectConfig from '../../project.config'
const appName = projectConfig.appName
import {Home} from './routes/Home'
import {Company} from './routes/Company'
import {Companies} from './routes/Companies'
import './styles/core.scss'

class App extends Component {
    render() {
        return (
          <div className="app">
            <Helmet titleTemplate={`%s | ${appName}`} defaultTitle={appName} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/companies" component={Companies} />
              <Route path="/company/:company_id" component={Company} />
            </Switch>
        </div>
        )
    }
}

export default App
