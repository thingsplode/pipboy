export const LOG_ME_IN = 'LOG_ME_IN'
export const DISPLAY_FORM = 'DISPLAY_FORM'

export const AuthenticationStatus = {
    NOT_AUTHENTICATED: 'NOT_AUTHENTICATED',
    LOGGED_IN: 'LOGGED_IN'
}

export const DisplayContentType = {
    FORM: 'FORM',
    LIST: 'LIST',
    DASHBOARD: 'DASHBOARD',
    MENU_LIST: 'MENU_LIST'
}

export const FieldType = {
    TEXT: 'TEXT',
    PASS: 'PASS',
    DATE: 'DATE'
}

export function displayForm(form) {
    return {
        type: DISPLAY_FORM,
        form: form
    }
}

export function logIn(usr, pass) {
    return {
        type: LOG_ME_IN,
        user: user,
        password: pass
    }
}
