import {connect} from 'react-redux'
import AppMenu from '../components/AppMenu'

const mapStateToProps = (state) => {
    return {appLinks: state.appLinks}
}

const AppMenuContainer = connect(mapStateToProps)(AppMenu)

export default AppMenuContainer
