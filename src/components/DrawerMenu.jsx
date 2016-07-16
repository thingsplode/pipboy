import React, { PropTypes } from 'react'
import {Navigation,Drawer} from 'react-mdl';

const DrawerMenu = ({drawerTitle, drawerLinks}) => (
    <Drawer title={drawerTitle}>
        <Navigation>
            {drawerLinks.map(link => <a key={link.id} href={link.route} className='mdl-navigation__link'>{link.text}</a>)}
        </Navigation>
    </Drawer>
)

DrawerMenu.propTypes = {
    drawerTitle: PropTypes.string.isRequired,
    drawerLinks: PropTypes.arrayOf(PropTypes.shape({id: PropTypes.number.isRequired, route: PropTypes.string.isRequired, text: PropTypes.string.isRequired}).isRequired).isRequired,
}

export default DrawerMenu
