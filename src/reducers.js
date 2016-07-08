import {
    AuthenticationStatus,
    DisplayContentType,
    DISPLAY_FORM
} from './actions'

const initialState = {
    authenticationStatus: AuthenticationStatus.NOT_AUTHENTICATED,
    session: {
        user: '',
        password: '',
        auth_method: '',
        token: ''
    },
    displayContentType: DisplayContentType.FORM,
    displayConent: '',
    menu: [],
    commandHistory: []
}

export default function app(state = initialState, action) {
    switch (action.type) {
        case DISPLAY_FORM:
            return Object.assign({}, state, {
                displayContentType: DisplayContentType.FORM,
                displayConent: action.form
            })
        default:
            return state;
    }
}
