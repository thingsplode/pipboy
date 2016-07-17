import React, {PropTypes} from 'react'
import {Navigation} from 'react-mdl';

const AppMenu = ({appLinks}) => (
  <Navigation>
    {appLinks.map(link => <a key={link.id} href={link.route} className='mdl-navigation__link'>{link.text}</a>)}
  </Navigation>
)

AppMenu.propTypes = {
  appLinks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired}).isRequired).isRequired
}

export default AppMenu
