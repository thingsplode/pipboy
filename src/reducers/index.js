import {combineReducers} from 'redux'
import {
    AuthenticationStatus,
    DisplayContentType,
    DisplayContentStatus,
    FieldType,
    FormEnclosureType,
    SystemMenuType,
    Level
} from '../core'
import {AUTHENTICATED, UPDATE_CONTENT, ADD_CONTENT, REMOVE_CONTENT, LOAD_FRAME, SHOW_ERROR, TRIGGER_ACTION} from '../actions'

const initialSession = {
    authenticationStatus: AuthenticationStatus.NOT_AUTHENTICATED,
    user: '',
    password: '',
    auth_method: '',
    token: '',
    expire: ''
}

const initialDisplayContent = [{
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
        type: 'buttonClicked',
        key: 'Enter',
        args: ['user', 'pass']
    }]
}]

const initialFrameData = {
    appTitle: 'some app title',
    drawerTitle: 'Modules',
    modules: undefined,
    systemMenus: undefined
}

function session(state = initialSession, action) {
    switch (action.type) {
        case AUTHENTICATED:
            return Object.assign({}, state, {
                authenticationStatus: AuthenticationStatus.LOGGED_IN,
                user: action.user,
                token: action.token,
                expire: action.expire
            })
        case TRIGGER_ACTION:
            return state;
        default:
            return state;
    }
}

function displayContent(state = initialDisplayContent, action) {
    switch (action.type) {
        case SHOW_ERROR:
            return Object.assign({}, state, {})
        case UPDATE_CONTENT:
            return state.map(content => {
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
        case REMOVE_CONTENT:
            return state.filter(content => {
                return content.id !== action.contentId
            })
        case ADD_CONTENT:
        default:
            return state;
    }
}

function frameData(state = initialFrameData, action) {
    switch (action.type) {
        case LOAD_FRAME:
            return Object.assign({}, state, {
                modules: action.frameData.modules,
                systemMenus: action.frameData.systemMenus
            })
        default:
            console.warn('Unhandled action received: ' + action.type)
            return state
    }
}

const appState = combineReducers({
    session,
    frameData,
    displayContent,
})

export default appState
