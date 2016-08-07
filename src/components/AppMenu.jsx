import React, {PropTypes} from 'react'
import {Navigation, Icon, IconButton, Menu, MenuItem} from 'react-mdl'
import Tooltip from './Tooltip'
import {SystemMenuType, ActionSource} from '../core'


const AppMenu = ({appLinks, callSystemActionFunction}) => {
    let navigationElements = []
    appLinks.map(link => {
        switch (link.type) {
            case SystemMenuType.SIMPLE:
                navigationElements.push(
                    <Tooltip label={link.text} key={"tt_" + link.id}>
                        <IconButton key={link.id} id={link.id}
                                    name={link.icon}
                                    data-action={link.action}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        callSystemActionFunction(link.action, ActionSource.SYSTEM_MENU)
                                    }}
                        />
                    </Tooltip>
                )
                break;
            case SystemMenuType.SUB_MENU:
                navigationElements.push(
                    <div style={{position: 'relative'}} key={"dv_" + link.id}>
                        <Tooltip label={link.text} key={"tt_" + link.id}>
                            <IconButton id={link.id} name={link.icon}/>
                        </Tooltip>
                        <Menu target={link.id}>
                            {link.items.map(menuItem =>
                                <MenuItem key={menuItem.id} data-action={menuItem.action} disabled={menuItem.disabled}
                                          onClick={(e) => {
                                              e.preventDefault()
                                              callSystemActionFunction(menuItem.action, ActionSource.SYSTEM_MENU)
                                          }}>
                                    <Icon name={menuItem.icon}/> {menuItem.text}</MenuItem>
                            )}
                        </Menu>
                    </div>
                )
                break;
            case SystemMenuType.CONTAINER:
                navigationElements.push(<Tooltip label={link.text} key={"tt_" + link.id}>
                    <IconButton key={link.id} id={link.id} name={link.icon}
                                onClick={(e) => {
                                    e.preventDefault()
                                    callSystemActionFunction(link.action, ActionSource.SYSTEM_MENU)
                                }}
                                data-action={link.action}/></Tooltip>
                )
                break;
        }
    })

    return (
        <Navigation>
            {navigationElements}
        </Navigation>)
}

AppMenu.propTypes = {
    appLinks: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        action: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
    }).isRequired).isRequired,
    callSystemActionFunction: PropTypes.func.isRequired
}

export default AppMenu
