import {connect} from 'react-redux'
import Frame from '../components/Frame'

const mapStateToProps = (state) => {
    return {
        frameData: state.frameData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {dispatch: dispatch}
}

const FrameContainer = connect(mapStateToProps, mapDispatchToProps)(Frame)

export default FrameContainer
