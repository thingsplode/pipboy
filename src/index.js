import 'babel-polyfill'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import appState from './reducers'
import React from 'react';
import ReactDOM from 'react-dom';
import FrameContainer from './containers/FrameContainer'

import {createStore, applyMiddleware} from 'redux'
import {connect, Provider} from 'react-redux'

const loggerMiddleware = createLogger()
const store = createStore(
    appState,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
)
//const unsubscribe = store.subscribe(() => console.log('state changed !!!' + JSON.stringify(store.getState())))

var App = class {
    constructor() {
    }

    render() {
        ReactDOM.render(
            <Provider store={store}>
                <FrameContainer/>
            </Provider>, document.getElementById('app'))
    }
}

var appx = new App()
appx.render()
