import React, { Component } from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'
import Helmet from 'react-helmet'
import projectConfig from '../../project.config'
const appName = projectConfig.appName
import {Home} from './routes/Home'
import {Company} from './routes/Company'
import {Stadium} from './routes/Stadium'
import {Companies} from './routes/Companies'
import {Stadiums} from './routes/Stadiums'
import {Investments} from './routes/Investments'

import './styles/core.scss'

class App extends Component {
    render() {
        return (
          <div className="app">
            <Helmet titleTemplate={`%s | ${appName}`} defaultTitle={appName} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/companies" component={Companies} />
              <Route path="/stadiums" component={Stadiums} />
              <Route path="/investments" component={Investments} />
              <Route path="/company/:company_id" component={Company} />
              <Route path="/stadium/:stadium_id" component={Stadium} />
            </Switch>
        </div>
        )
    }
}

export default App
