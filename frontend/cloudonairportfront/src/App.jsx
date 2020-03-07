import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import HomePage from './pages/Home/HomePage'

class App extends Component {
    render() {
        return (
            <div>
                <HashRouter>
                    <Switch>
                        <Route path="/">
                            <HomePage />
                        </Route>
                    </Switch>
                </HashRouter>
            </div>
        )
    }
}

export default App