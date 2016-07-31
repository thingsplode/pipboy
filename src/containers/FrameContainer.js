import {connect} from 'react-redux'
import Frame from '../components/Frame'

const mapStateToProps = (state) => {
    return {
        frameData: state.frameData
    }
}

const FrameContainer = connect(mapStateToProps)(Frame)

export default FrameContainer
