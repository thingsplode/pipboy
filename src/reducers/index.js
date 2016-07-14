import {
    AuthenticationStatus,
    DisplayContentType,
    FieldType,
    DISPLAY_FORM
} from '../actions'

const initialState = {
    authenticationStatus: AuthenticationStatus.NOT_AUTHENTICATED,
    session: {
        user: '',
        password: '',
        auth_method: '',
        token: ''
    },
    title: 'some app title',
    displayContent: [{
        type: DisplayContentType.FORM,
        items: [{
            id: 'user',
            type: FieldType.TEXT,
            label: 'User',
            icon: '',
            validation: '',
            error: ''
        }, {
            id: 'pass',
            type: FieldType.PASS,
            label: 'Password',
            icon: '',
            validation: '',
            error: ''
        }],
        actions: [{
            action: 'logIn',
            args: ['user', 'pass']
        }]
    }],
    appLinks: [{
        id: 1,
        route: 'command',
        text: 'command'
    }, {
        id: 2,
        route: 'hup',
        text: 'hup'
    }, {
        id: 3,
        route: 'three',
        text: 'three'
    }],
    drawerLinks: [{
        id: 1,
        route: 'one',
        text: 'one'
    }, {
        id: 2,
        route: 'two',
        text: 'two'
    }, {
        id: 3,
        route: 'three',
        text: 'three'
    }],
    commandHistory: []
}


export default function appState(state = initialState, action) {
    switch (action.type) {
        case DISPLAY_FORM:
            return Object.assign({}, state, {
                displayContentType: DisplayContentType.FORM,
                displayContent: action.form
            })
        default:
            return state;
    }
}
