import React, { Component } from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'
import Helmet from 'react-helmet'
import project from '../project.config'
import Home from 'scenes/Home'
import NotFound from 'components/NotFound'
import Nav from 'components/Nav'
import 'style.scss'

class App extends Component {
    render() {
        return (
          <div className="app">
            <Helmet titleTemplate={`%s | ${project.app_name}`} defaultTitle={project.app_name} />
            {/*<Nav />*/}
            <Switch>
              <Route exact path="/" render={() => <Home />} />
              <Route path="/home" render={() => <Home />} />
              <Route component={NotFound} />
            </Switch>
        </div>
        )
    }
}

export default App
