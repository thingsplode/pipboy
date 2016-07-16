import {connect} from 'react-redux'
import ContentRenderer from '../components/ContentRenderer'

const mapStateToProps = (state) => {
    return {content: state.displayContent}
}

const mapDispatchToProps = (dispatch) => {
    return {dispatch: dispatch}
}

const ContentRendererContainer = connect(mapStateToProps, mapDispatchToProps)(ContentRenderer)

export default ContentRendererContainer
