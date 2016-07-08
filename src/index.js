import Frame from './frame.jsx'
import app from './reducers.js'
import {
    displayForm
} from './actions.js'

import {
    createStore
} from 'redux'


var store = createStore(app)
let unsubscribe = store.subscribe(() =>
    console.log(store.getState())
)

var Appx = class {
    constructor() {
        let f = new Frame();
        console.log(store.getState());
        store.dispatch(displayForm({
            label: 'alma'
        }))
    }
}

var appx = new Appx()
