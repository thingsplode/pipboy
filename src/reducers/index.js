import {
    AuthenticationStatus,
    DisplayContentType,
    DisplayContentStatus,
    FieldType,
    FormEnclosureType,
    Level
} from '../core'
import {AUTHENTICATED, UPDATE_CONTENT, ADD_CONTENT, REMOVE_CONTENT} from '../actions'

const initialState = {
    title: 'some app title',
    session: {
        authenticationStatus: AuthenticationStatus.NOT_AUTHENTICATED,
        user: '',
        password: '',
        auth_method: '',
        token: '',
        expire: ''
    },
    frame: {
        appLinks: [{
            id: 'command',
            route: 'command',
            text: 'command'
        }, {
            id: 'hup',
            route: 'hup',
            text: 'hup'
        }, {
            id: 'three',
            route: 'three',
            text: 'three'
        }],
        drawerTitle: 'Modules',
        drawerLinks: [{
            id: 'one',
            icon: '',
            route: 'one',
            text: 'one'
        }, {
            id: 'two',
            icon: '',
            route: 'two',
            text: 'two'
        }, {
            id: 'three',
            icon: '',
            route: 'three',
            text: 'three'
        }]
    },
    displayContent: [{
        id: 'login_form',
        type: DisplayContentType.FORM,
        status: DisplayContentStatus.LOADED,
        statusMessage: {},
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
            defaultValue: 'john_doe',
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
            id: 'logIn',
            label: 'Log in',
            type: 'submit',
            args: ['user', 'pass']
        }]
    }],
    commandHistory: []
}


export default function appState(state = initialState, action) {
    switch (action.type) {
        case UPDATE_CONTENT:
            return Object.assign({}, state, {
                displayContent: state.displayContent.map(content => {
                    if (content.id === action.contentId) {
                        return Object.assign({}, content, {
                            status: action.status,
                            statusMessage: {
                                level: action.level,
                                text: action.text
                            }
                        })
                    }
                })
            })
        case REMOVE_CONTENT:
            return Object.assign({}, state, {
                displayContent: state.displayContent.filter(content => {return content.id !== action.contentId})
            })
        case ADD_CONTENT:
        case AUTHENTICATED:
            return Object.assign({}, state, {
                session: {
                    authenticationStatus: AuthenticationStatus.LOGGED_IN,
                    user: action.user,
                    token: action.token,
                    expire: action.expire
                }
            })
        default:
            console.warn('Unhandled action received: ' + JSON.stringify(action))
            return state;
    }
}
