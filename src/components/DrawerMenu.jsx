import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {Navigation, Drawer} from 'react-mdl';
import {ActionSource} from '../core'

class DrawerMenu extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        //console.log('componentDidMount')
        //let domNode = ReactDOM.findDOMNode(this.props.frameInstance)
        let domNode = ReactDOM.findDOMNode(this)
        let ch = componentHandler.upgradeElement(domNode)
        componentHandler.upgradeDom()
    }

    render() {
        return (
            <Drawer title={this.props.drawerTitle}>
                {typeof this.props.drawerLinks !== "undefined" ?
                    <Navigation>
                        {this.props.drawerLinks.map(link =>
                            <a key={link.id}
                               data-action = {link.route}
                               onClick={(e) => {
                                    e.preventDefault()
                                   //hide the drawer
                                   document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer();
                                   this.props.callSystemActionFunction(e.target.dataset.action, ActionSource.MODULE)
                               }}
                               className='mdl-navigation__link'>{link.text}</a>)}
                    </Navigation> : <Navigation/>}
            </Drawer>
        )
    }
}

DrawerMenu.propTypes = {
    drawerTitle: PropTypes.string.isRequired,
    drawerLinks: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        route: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired).isRequired,
    callSystemActionFunction: PropTypes.func.isRequired
}

export default DrawerMenu
