import React, {PropTypes} from 'react'
import {Layout, Header, Content, Textfield} from 'react-mdl';
import {DisplayContentType, FieldType} from '../actions'
import Form from './Form'

const ContentRenderer = ({content}) => {
    let contentChain = []
    content.map(contentElement => {
        switch (contentElement.type) {
            case DisplayContentType.FORM:
                contentChain.push(<Form key={contentChain.length} fields={contentElement.items}/>)
                break;
            case DisplayContentType.LIST:
                contentChain.push(<div>LIST</div>)
                break;
            default:
                contentChain.push(<div>DEFAULT</div>)
                break;
        }
    })
    return (<span>{contentChain}</span>)
}

ContentRenderer.propTypes = {
    content: PropTypes.arrayOf(PropTypes.shape({type: PropTypes.string.isRequired}).isRequired).isRequired,
}

export default ContentRenderer
