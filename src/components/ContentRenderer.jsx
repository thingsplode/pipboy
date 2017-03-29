import React, {PropTypes} from 'react'
import {DisplayContentType} from '../core'
import Form from './widgets/Form'
import DataList from './widgets/DataList'

const ContentRenderer = ({cellId, content, dispatch}) => {
    let contentChain = [];
    try {
        console.log('rendering for cell id: ' + cellId);
        console.log(content)
        let filteredElems = content.filter(displayElement => {
            return typeof displayElement !== 'undefined' ? displayElement.cellidx === cellId : false
        });
        console.log('filtered elem size: ' + filteredElems.length);
        filteredElems.map(contentElement => {
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
                    );
                    break;
                case DisplayContentType.LIST:
                    contentChain.push(<DataList key={contentElement.id} content={contentElement}/>);
                    break;
                default:
                    contentChain.push(<div>DEFAULT</div>);
                    break;
            }
        });
    } catch (e) {
        console.error('Error while generating content: ' + e)
    }
    return (<span key={contentChain.length}>{contentChain}</span>)
};

ContentRenderer.propTypes = {
    content: PropTypes.arrayOf(PropTypes.shape({type: PropTypes.string.isRequired})).isRequired,
};

export default ContentRenderer
