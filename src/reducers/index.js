import {
    AuthenticationStatus,
    DisplayContentType,
    DisplayContentStatus,
    FieldType,
    DISPLAY_FORM,
    FormEnclosureType
} from '../actions'

const initialState = {
    title: 'some app title',
    session: {
        authenticationStatus: AuthenticationStatus.NOT_AUTHENTICATED,
        user: '',
        password: '',
        auth_method: '',
        token: ''
    },
    frame: {
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
        drawerTitle: 'Modules',
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
        }]
    },
    displayContent: [{
        type: DisplayContentType.FORM,
        status: DisplayContentStatus.LOADED,
        enclosure: {
            title: 'Log In',
            type: FormEnclosureType.CARD,
            background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) bottom right 15% no-repeat #fff',
            color: '#fff',
            padding: '20px'
        },
        items: [{
            id: 'user',
            type: FieldType.TEXT,
            label: 'User',
            defaultValue: 'some_user',
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
            actionId: 'logIn',
            label: 'Log in',
            type: 'submit',
            args: ['user', 'pass']
        }]
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
            console.warn('Unhandled action received: ' + JSON.stringify(action))
            return state;
    }
}
