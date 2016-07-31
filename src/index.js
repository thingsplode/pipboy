import 'babel-polyfill'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import appState from './reducers'
import React from 'react';
import ReactDOM from 'react-dom';
import FrameContainer from './containers/FrameContainer'
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage';

import {createStore, applyMiddleware} from 'redux'
import {connect, Provider} from 'react-redux'


const storedAppState = storage.reducer(appState)

const engine = createEngine('pipboy-state');
const storageMiddleware = storage.createMiddleware(engine);
const loggerMiddleware = createLogger()
const store = createStore(
    storedAppState,
    applyMiddleware(thunkMiddleware, loggerMiddleware, storageMiddleware)
)
//const unsubscribe = store.subscribe(() => console.log('state changed !!!' + JSON.stringify(store.getState())))

const load = storage.createLoader(engine);
load(store)
    .then((newState) => console.log('Loaded state:', newState))
    .catch(() => console.log('Failed to load previous state'));

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
