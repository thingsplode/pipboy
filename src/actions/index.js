import fetch from 'isomorphic-fetch'
import {FetchUtil} from '../Util'
import {Level, DisplayContentStatus} from '../core'

export const UPDATE_CONTENT = 'UPDATE_CONTENT'
export const REMOVE_CONTENT = 'REMOVE_CONTENT'
export const ADD_CONTENT = 'ADD_CONTENT'
export const ADD_MENU = 'ADD_MENU'
export const REMOVE_MENU = 'REMOVE_MENU'
export const AUTHENTICATED = 'AUTHENTICATED'
export const LOAD_FRAME = 'LOAD_FRAME'
export const SHOW_ERROR = 'SHOW_ERROR'
export const LOGOUT = 'LOGOUT'
export const TRIGGER_ACTION = 'TRIGGER_ACTION'

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
    loadModules(frameData){
        return {
            type: LOAD_FRAME,
            frameData: frameData
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
    },
    triggerAction(name){
        return {
            type: TRIGGER_ACTION,
            name
        }
    }}

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
                    dispatch(Actions.retreiveFrameData())
                })
                .catch(function (error) {
                    console.error(error)
                    dispatch(ContentActions.updateContent(sourceId, DisplayContentStatus.FAILED, Level.ERR, error.toString()))
                })
        }
    },
    triggerAction(actionName){
        return function (dispatch) {
            dispatch(ContentActions.triggerAction(actionName))
            if (typeof Actions[actionName] === "function") {
                dispatch(Actions[actionName]())
            }

        }
    },
    logout(){
        return function (dispatch, getState) {
            const {session} = getState()
            return fetch('/api/logout',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'X-Auth-Token': session.token
                }}).then(FetchUtil.checkStatus)
                .then(FetchUtil.parseJSON)
                .then(json => {
                    console.log(JSON.stringify(json))
                })
        }
    },
    retreiveFrameData(){
        return function (dispatch) {
            return fetch('/api/frame', {
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
