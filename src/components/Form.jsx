import React, {PropTypes} from 'react'
import {Layout, Header, Content, Textfield} from 'react-mdl';

const Form = ({fields}) => (
    <div style={{
        width: '80%',
        margin: 'auto'
    }}>
        {fields.map(field =><div> <Textfield
            key={field.id}
            onChange={() => {
            }}
            label={field.label}
            style={{width: '200px'}}
        /></div>)}
    </div>
)

Form.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
    }).isRequired).isRequired,
}

export default Form

