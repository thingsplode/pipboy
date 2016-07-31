import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {Navigation, Drawer} from 'react-mdl';

class DrawerMenu extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        console.log('componentDidMount')
        //let domNode = ReactDOM.findDOMNode(this.props.frameInstance)
        let domNode = ReactDOM.findDOMNode(this)
        let ch = componentHandler.upgradeElement(domNode)
        componentHandler.upgradeDom()
    }

    render() {
        return (
            <Drawer title={this.props.drawerTitle}>
                {typeof this.props.drawerLinks !== "undefined" ? <Navigation>
                    {this.props.drawerLinks.map(link => <a key={link.id} href={link.route}
                                                           className='mdl-navigation__link'>{link.text}</a>)}
                    </Navigation> : <Navigation/>}
            </Drawer>
        )
    }
}

const DrawerMenuOld = ({drawerTitle, drawerLinks}) => (
    <Drawer title={drawerTitle}>
        <Navigation>
            {drawerLinks.map(link => <a key={link.id} href={link.route}
                                        className='mdl-navigation__link'>{link.text}</a>)}
        </Navigation>
    </Drawer>
)

DrawerMenu.propTypes = {
    drawerTitle: PropTypes.string.isRequired,
    drawerLinks: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        route: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired).isRequired,
}

export default DrawerMenu
