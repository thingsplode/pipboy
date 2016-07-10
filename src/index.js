import appState from './reducers'
import React from 'react';
import ReactDOM from 'react-dom';
import FrameContainer from './containers/FrameContainer'
import {displayForm} from './actions'

import {createStore} from 'redux'
import {connect, Provider} from 'react-redux'

let store = createStore(appState)
let unsubscribe = store.subscribe(() => console.log('state_subscription: -> ' + JSON.stringify(store.getState())))

var App = class {
    constructor() {
        // const mapStateToProps = (state) => {
        //     return {headerLinks: this.links, drawerLinks: this.links}
        // }
        //
        // const mapDispatchToProps = (dispatch) => {}

        // let f = connect(mapStateToProps, mapDispatchToProps)(Frame)
        // console.log(store.getState());
        //store.dispatch(displayForm({label: 'alma'}))
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
