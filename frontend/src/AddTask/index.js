import React from "react"
import {Input, Form, InputGroup} from "reactstrap"
import "../style.css"

export default class AddTask extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: "",
            hovering: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({title: event.target.value})
    }

    handleSubmit(event, handleTaskAdded) {
        event.preventDefault()
        const title = this.state.title
        if (title !== "") {
            this.setState({title: ""})
            handleTaskAdded(title)

        }
    }

    render() {
        const {onTaskAdded} = this.props
        const {title, hovering} = this.state

        let button = "hand d-flex align-items-center me-2 text-primary"
        if (hovering && title !== "")
            button += " bi bi-plus-circle-fill"
        else
            button += " bi bi-plus"

        return (
            <Form onSubmit={e => this.handleSubmit(e, onTaskAdded)}>
                <InputGroup className="m-1 px-3 py-0">
                    <i className={button}
                       onMouseEnter={_ => this.setState({hovering: true})}
                       onMouseLeave={_ => this.setState({hovering: false})}
                       onClick={e => this.handleSubmit(e, onTaskAdded)}/>
                    <Input type="text"
                           className="hand border-0 shadow-none"
                           placeholder="Add a task"
                           value={title}
                           onChange={this.handleChange}/>
                </InputGroup>
            </Form>
        )
    }

}