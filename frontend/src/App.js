import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import logo from './logo.svg';
import './App.css';

function isAuthenticated() {
    const token = localStorage.getItem('jwtToken');
    return token !== null;
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            )
        }
    />
);

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
            </Switch>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        </Router>
    );
}

export default App;
