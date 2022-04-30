import React from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import Routers from "./components/Router/Routers";
import {Provider} from 'react-redux';
import store from './redux/store';
import './App.css';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Routers/>
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;
