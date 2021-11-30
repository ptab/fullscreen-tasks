import React from "react"
import {Input, Form, InputGroup, InputGroupText} from "reactstrap"
import InputGroupIndicator from "../InputGroupIndicator";

const placeholder = "Add a task"

export default class AddTask extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: "",
            hovering: false,
            editing: false,
            placeholder: placeholder
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event, handleTaskAdded) {
        event.preventDefault()
        const title = this.state.title
        this.setState({title: "", placeholder: placeholder, editing: false})
        if (title !== "") {
            handleTaskAdded(title)
        }
    }

    render() {
        const {onTaskAdded} = this.props
        const {title, hovering, editing, placeholder} = this.state

        let input = "border-0 shadow-none"
        let button = "cursor-hand text-primary"
        if (editing) {
            input += " cursor-text"
            button += " bi bi-plus-circle-fill"
        } else if (hovering) {
            input += " cursor-hand text-primary"
            button += " bi bi-plus"
        } else {
            input += " cursor-hand"
            button += " bi bi-plus"
        }

        return (
            <Form onSubmit={e => this.handleSubmit(e, onTaskAdded)}>
                <InputGroup>
                    <InputGroupIndicator invisible />
                    <InputGroupText className="border-0 bg-body px-1">
                        <i className={button}
                           onMouseEnter={_ => this.setState({hovering: true})}
                           onMouseLeave={_ => this.setState({hovering: false})}
                           onClick={e => this.handleSubmit(e, onTaskAdded)}/>
                    </InputGroupText>
                    <Input type="text"
                           className={input}
                           placeholder={placeholder}
                           defaultValue={title}
                           onFocus={_ => this.setState({placeholder: "", editing: true})}
                           onChange={e => this.setState({title: e.target.value})}
                           onBlur={e => this.handleSubmit(e, onTaskAdded)}/>
                </InputGroup>
            </Form>
        )
    }

}