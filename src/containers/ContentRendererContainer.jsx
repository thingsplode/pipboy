import {connect} from 'react-redux'
import ContentRenderer from '../components/ContentRenderer'

const mapStateToProps = (state) => {
    return {content: state.displayContent}
}

const ContentRendererContainer = connect(mapStateToProps)(ContentRenderer)

export default ContentRendererContainer
