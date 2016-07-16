import React, {PropTypes} from 'react'
import {Card, CardText, CardTitle, CardActions, Button, Textfield} from 'react-mdl'
import {FormEnclosureType, Actions} from '../actions'


class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        props.fields.map(field => this.state[field.id] = typeof (field.defaultValue) !== 'undefined' ? field.defaultValue : '')
        this.submit = this.submit.bind(this)
        this.fieldChange = this.fieldChange.bind(this)
    }

    submit(actionEvent) {
        let action = this.props.actions.find(a => a.actionId == actionEvent.target.id)
        let dispatchActionArgs = action.args.map(arg => this.state[arg])
        this.props.dispatch(Actions[actionEvent.target.id].apply(this, dispatchActionArgs))
    }

    fieldChange(fieldChangeEvent) {
        this.state[fieldChangeEvent.target.id] = fieldChangeEvent.target.value
    }

    render() {
        switch (this.props.enclosure.type) {
            case FormEnclosureType.CARD:
                return (
                    <Card shadow={5} style={{width: '320px', height: '320px', margin: 'auto'}}>
                        <CardTitle expand style={{
                            color: this.props.enclosure.color,
                            background: this.props.enclosure.background
                        }}>{this.props.enclosure.title}</CardTitle>
                        {typeof (this.props.fields !== 'undefined') ?
                            <Fields fields={this.props.fields} fieldChangeFunction={this.fieldChange}/> : <br/>}
                        {typeof (this.props.actions !== 'undefined') ?
                            <CardActions border style={{float: 'right', padding: '10px', alignItems: 'center'}}>
                                {this.props.actions.map(action =>
                                    <Button key={action.actionId} id={action.actionId} type={action.type}
                                            onClick={e => {
                                                e.preventDefault()
                                                this.submit(e)
                                            }} colored>
                                        {action.label}
                                    </Button>)}
                            </CardActions>
                            : '<br/>'}
                    </Card>
                )
            case FormEnclosureType.TABLE:
            case FormEnclosureType.NONE:
            default:
                return (<div>Not Supported Yet</div>)
        }
    }
}

const FormEE = ({enclosure, fields, actions}) => {
    switch (enclosure.type) {
        case FormEnclosureType.CARD:
            return (
                <form onSubmit={e => {
                    e.preventDefault()
                }}>
                    <Card shadow={5} style={{width: '320px', height: '320px', margin: 'auto'}}>
                        <CardTitle expand style={{
                            color: enclosure.color,
                            background: enclosure.background
                        }}>{enclosure.title}</CardTitle>
                        <Fields fields={fields}/>
                        <CardActions border style={{float: 'right', padding: '10px', alignItems: 'center'}}>
                            {actions.map(action =>
                                <Button key={action.actionId} type={action.type} colored>
                                    {action.label}
                                </Button>)}
                        </CardActions>
                    </Card>
                </form>
            )
        case FormEnclosureType.TABLE:
        case FormEnclosureType.NONE:
        default:
            return (<div>Not Supported Yet</div>)
    }
}

const Fields = ({fields, fieldChangeFunction}) => (
    <div style={{
        width: '80%',
        margin: 'auto'
    }}>
        {fields.map(field => <div key={field.id}><Textfield
            onChange={e => {
                //validation comes here
                fieldChangeFunction(e)
            }}
            id={field.id}
            defaultValue={field.defaultValue}
            label={field.label}
            type={field.type}
            style={{width: '200px'}}
        /></div>)}
    </div>
)
Form.propTypes = {
    enclosure: PropTypes.shape({
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
    }).isRequired,
    fields: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
    }).isRequired).isRequired,
    actions: PropTypes.arrayOf(PropTypes.shape({
        actionId: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
    })).isRequired,
    dispatch: PropTypes.func.isRequired
}
export default Form

