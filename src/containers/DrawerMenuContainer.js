import {connect} from 'react-redux'
import DrawerMenu from '../components/DrawerMenu'

const mapStateToProps = (state) => {
    return {drawerLinks: state.drawerLinks}
}

const DrawerMenuContainer = connect(mapStateToProps)(DrawerMenu)

export default DrawerMenuContainer
