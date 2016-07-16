import {
    connect
} from 'react-redux'
import Frame from '../components/Frame'

const mapStateToProps = (state) => {
    return {
        title: state.title,
        frame: state.frame
    }
}

const FrameContainer = connect(mapStateToProps)(Frame)

export default FrameContainer
