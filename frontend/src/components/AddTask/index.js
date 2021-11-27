import React from "react"
import {Input, Form, InputGroup} from "reactstrap"
import "../../style.css"

const placeholder = "Add a task"

export default class AddTask extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: "",
            hovering: false,
            placeholder: placeholder
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event, handleTaskAdded) {
        event.preventDefault()
        const title = this.state.title
        if (title !== "") {
            this.setState({title: "", placeholder: placeholder})
            handleTaskAdded(title)
        }
    }

    render() {
        const {onTaskAdded} = this.props
        const {title, hovering, placeholder} = this.state

        let button = "hand d-flex align-items-center me-2 text-primary"
        if (hovering && title !== "")
            button += " bi bi-plus-circle-fill"
        else
            button += " bi bi-plus"

        return (
            <Form onSubmit={e => this.handleSubmit(e, onTaskAdded)}>
                <InputGroup>
                    <i className={button}
                       onMouseEnter={_ => this.setState({hovering: true})}
                       onMouseLeave={_ => this.setState({hovering: false})}
                       onClick={e => this.handleSubmit(e, onTaskAdded)}/>
                    <Input type="text"
                           className="hand border-0 shadow-none"
                           placeholder={placeholder}
                           value={title}
                           onFocus={_ => this.setState({placeholder: ""})}
                           onChange={e => this.setState({title: e.target.value})}
                           onBlur={e => this.handleSubmit(e, onTaskAdded)}/>
                </InputGroup>
            </Form>
        )
    }

}