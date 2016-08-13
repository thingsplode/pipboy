import React, {PropTypes} from 'react'
import {DisplayContentType, FieldType, FormEnclosureType} from '../core'
import Form from './Form'

const ContentRenderer = ({cellId, content, dispatch}) => {
    console.log('cellId -> ' + cellId)
    let contentChain = [];
    let filteredElems = content.filter(displayElement => {
        return displayElement.cellidx === cellId
    });
    console.log('elem size: ' + filteredElems.length)
    filteredElems.map(contentElement => {
        switch (contentElement.type) {
            case DisplayContentType.FORM:
                console.log('we push a nice form')
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
    });

    return (<span key={contentChain.length}>{contentChain}</span>)
};

ContentRenderer.propTypes = {
    content: PropTypes.arrayOf(PropTypes.shape({type: PropTypes.string.isRequired})).isRequired,
};

export default ContentRenderer
