import React, {PropTypes} from 'react'
import {Card, CardText, CardTitle, CardActions, Button, Textfield, ProgressBar} from 'react-mdl'
import {Actions} from '../actions'
import {FormEnclosureType, Level, DisplayContentStatus} from '../core'
import Message from './Message'


class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        props.fields.map(field => this.state[field.id] = typeof (field.defaultValue) !== 'undefined' ? field.defaultValue : '')
        this.submit = this.submit.bind(this)
        this.buttonClicked = this.buttonClicked.bind(this)
        this.keyPressed = this.keyPressed.bind(this)
        this.fieldChange = this.fieldChange.bind(this)
        this.isIndeterminate = this.isIndeterminate.bind(this)
    }

    submit(action) {
        let dispatchActionArgs = action.args.map(arg => this.state[arg])
        dispatchActionArgs.push(this.props.id)
        this.props.dispatch(Actions[action.id].apply(this, dispatchActionArgs))
    }

    buttonClicked(actionEvent) {
        let action = this.props.actions.find(a => a.id == actionEvent.target.id)
        if (typeof action !== 'undefined') {
            this.submit(action)
        }
    }

    keyPressed(keyEvent) {
        let action = this.props.actions.find(a => a.key == keyEvent.key)
        if (typeof action !== 'undefined') {
            this.submit(action)
        }
    }

    fieldChange(fieldChangeEvent) {
        this.state[fieldChangeEvent.target.id] = fieldChangeEvent.target.value
    }

    isIndeterminate() {
        return this.props.status === DisplayContentStatus.LOADING || this.props.status === DisplayContentStatus.POSTED
    }

    render() {
        switch (this.props.enclosure.type) {
            case FormEnclosureType.CARD:
                return (
                    <Card
                        shadow={5}
                        style={{width: '320px', height: '320px', margin: 'auto'}}
                    >
                        <CardTitle expand style={{
                            color: this.props.enclosure.color,
                            background: this.props.enclosure.background
                        }}>{this.props.enclosure.title}</CardTitle>
                        {this.isIndeterminate() ? <ProgressBar indeterminate/> : ''}
                        {this.props.status === DisplayContentStatus.FAILED ?
                            <CardText>
                                <Message level={this.props.statusMessage.level}
                                         message={this.props.statusMessage.text}/>
                            </CardText>
                            : ''}
                        <Fields fields={this.props.fields} fieldChangeFunction={this.fieldChange}
                                keyPressedFunction={this.keyPressed}/>

                        {typeof (this.props.actions !== 'undefined') && !this.isIndeterminate() ?
                            <CardActions border style={{float: 'right', padding: '10px', alignItems: 'center'}}>
                                {this.props.actions.map(action =>
                                    <Button key={action.id} id={action.id} type={action.type}
                                            onClick={e => {
                                                e.preventDefault()
                                                this.buttonClicked(e)
                                            }} colored>
                                        {action.label}
                                    </Button>)}
                            </CardActions>
                            : <CardText><Message level={this.props.statusMessage.level}
                                                 message={this.props.statusMessage.text}/></CardText>}
                    </Card>
                )
            case FormEnclosureType.TABLE:
            case FormEnclosureType.NONE:
            default:
                return (<div>Not Supported Yet</div>)
        }
    }
}

const Fields = ({fields, fieldChangeFunction, keyPressedFunction}) => (
    <div style={{
        width: '80%',
        margin: 'auto'
    }}>
        {fields.map(field => <div key={field.id}><Textfield
            onChange={e => {
                //validation comes here
                fieldChangeFunction(e)
            }}
            onKeyPress={e => {
                keyPressedFunction(e)
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
    id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    statusMessage: PropTypes.shape({
        level: PropTypes.string,
        text: PropTypes.string
    }),
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
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
    })).isRequired,
    dispatch: PropTypes.func.isRequired
}
export default Form

