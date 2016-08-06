import React, {PropTypes} from 'react'
import {Navigation, Icon, Tooltip} from 'react-mdl'
import {SystemMenuType} from '../core'


const AppMenu = ({appLinks, onMenuClick}) => {
    let navigationElements = []
    appLinks.map(link => {
        switch (link.type) {
            case SystemMenuType.SIMPLE:
                navigationElements.push(<a key={link.id} id={link.id} href={link.route} className='mdl-navigation__link'
                                           onClick={(e) => onMenuClick(e)}><Tooltip label={link.text}>
                    <Icon name={link.icon} data-action={link.action}/></Tooltip>
                </a>)
                break;
            case SystemMenuType.CONTAINER:
                navigationElements.push(
                    <div style={{position: 'relative'}}>
                        <IconButton name={link.icon} id={link.id} />
                        <Menu target={link.id}>
                            {/*{link.}*/}
                            <MenuItem>Some Action</MenuItem>
                            <MenuItem>Another Action</MenuItem>
                            <MenuItem disabled>Disabled Action</MenuItem>
                            <MenuItem>Yet Another Action</MenuItem>
                        </Menu>
                    </div>
                )
                break;
            case SystemMenuType.SUB_MENU:
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
    onMenuClick: PropTypes.func.isRequired
}

export default AppMenu
