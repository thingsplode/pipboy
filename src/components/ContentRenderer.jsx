import React, {PropTypes} from 'react'
import {DisplayContentType, FieldType, FormEnclosureType} from '../core'
import Form from './Form'

const ContentRenderer = ({content, dispatch}) => {
    let contentChain = []
    content.map(contentElement => {
        switch (contentElement.type) {
            case DisplayContentType.FORM:
                contentChain.push(
                    <Form
                        id={contentElement.id}
                        key={contentElement.id}
                        status={contentElement.status}
                        statusMessage={contentElement.statusMessage}
                        enclosure={contentElement.enclosure}
                        fields={contentElement.items}
                        actions={contentElement.actions}
                        dispatch={dispatch}
                    />
                )
                break;
            case DisplayContentType.LIST:
                contentChain.push(<div>LIST</div>)
                break;
            default:
                contentChain.push(<div>DEFAULT</div>)
                break;
        }
    })
    return (<span key={contentChain.length}>
            {contentChain}
        </span>)
}

ContentRenderer.propTypes = {
    content: PropTypes.arrayOf(PropTypes.shape({type: PropTypes.string.isRequired})).isRequired,
}

export default ContentRenderer
