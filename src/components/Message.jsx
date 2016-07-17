import React, {PropTypes} from 'react'
import {Level} from '../core'

class Message extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){
        switch (this.props.level){
            case Level.INFO: return (<span>{this.props.message}</span>)
            case Level.WARN: return (<span>{this.props.message}</span>)
            case Level.ERR:
            default: return (<span style={{color: 'red', fontWeight: 'bold'}}>{this.props.message}</span>)
        }
    }
}

Message.propTypes = {
    level: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
}

export default Message