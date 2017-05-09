import React, { Component } from 'react'
import { Switch } from 'react-router'
import { Route,BrowserRouter } from 'react-router-dom'
import Helmet from 'react-helmet'
import project from '../project.config'
import Home from 'scenes/Home'
import NotFound from 'components/NotFound'
import Nav from 'components/Nav'

class App extends Component {
    render() {
        return (
          <BrowserRouter>
            <div className="app">
              <Helmet titleTemplate={`%s | ${project.app_name}`} defaultTitle={project.app_name} />
              <Nav />
              <Switch>
                <Route exact path='/' render={() => <Home />} />
                <Route path='/home' render={() => <Home />} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </BrowserRouter>
        );
    }
}

export default App;
