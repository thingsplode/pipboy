import fetch from 'isomorphic-fetch'
import {FetchUtil} from '../Util'
import {Level, DisplayContentStatus} from '../core'

export const UPDATE_CONTENT = 'UPDATE_CONTENT'
export const REMOVE_CONTENT = 'REMOVE_CONTENT'
export const ADD_CONTENT = 'ADD_CONTENT'
export const ADD_MENU = 'ADD_MENU'
export const REMOVE_MENU = 'REMOVE_MENU'
export const AUTHENTICATED = 'AUTHENTICATED'
export const LOAD_MODULES = 'LOAD_MODULES'
export const SHOW_ERROR = 'SHOW_ERROR'

export const AuthenticationActions = {
    authenticated(user, token, expire){
        return {
            type: AUTHENTICATED,
            user: user,
            token: token,
            expire: expire
        }
    }
}

export const ContentActions = {
    showError(level, text){
        return {
            type: SHOW_ERROR,
            level: level,
            text: text
        }
    },
    loadModules(modules){
        return {
            type: LOAD_MODULES,
            modules: modules
        }
    },
    addMenu(links, intoDrawer){
        return {
            type: ADD_MENU,
            drawer: intoDrawer,
            links: links
        }
    },
    removeMenu(appLinkId){
        return {
            type: REMOVE_MENU,
            applinkId: appLinkId
        }
    },
    updateContent(contentId, contentStatus, level, text){
        return {
            type: UPDATE_CONTENT,
            contentId: contentId,
            status: contentStatus,
            level: level,
            text: text
        }
    },
    removeContent(contentId){
        return {
            type: REMOVE_CONTENT,
            contentId: contentId
        }
    },
    addContent(content){
        return {
            type: ADD_CONTENT,
            content: content
        }
    }
}
export const Actions = {
    logIn(user, pass, sourceId) {
        return function (dispatch) {
            dispatch(ContentActions.updateContent(sourceId, DisplayContentStatus.POSTED, Level.INFO, 'Loading...'))
            return fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded"
                },
                body: 'username=' + user + '&password=' + pass + '&eauth=pam'

            }).then(FetchUtil.checkStatus)
                .then(rsp => {
                    dispatch(ContentActions.removeContent(sourceId))
                    return rsp
                })
                .then(FetchUtil.parseJSON)
                .then(json => {
                    console.log(JSON.stringify(json))
                    dispatch(AuthenticationActions.authenticated(json.return[0].user, json.return[0].token, json.return[0].expire))
                    dispatch(Actions.retreiveModules())
                })
                .catch(function (error) {
                    console.error(error)
                    dispatch(ContentActions.updateContent(sourceId, DisplayContentStatus.FAILED, Level.ERR, error.toString()))
                })
        }
    },

    retreiveModules(){
        return function (dispatch) {
            return fetch('/api/modules', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            }).then(FetchUtil.checkStatus)
                .then(FetchUtil.parseJSON)
                .then(json => {
                    dispatch(ContentActions.loadModules(json))
                })
                .catch(function (error) {
                    console.error(error)
                    dispatch(ContentActions.updateContent(Level.ERR, error.toString()))
                })
        }
    }
}
