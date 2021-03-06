import React from "react"
import {Input, Form, InputGroup, InputGroupText} from "reactstrap"
import InputGroupSpacing from "./InputGroupSpacing";

export default class AddSubtask extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: "",
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event, task, handleTaskAdded) {
        event.preventDefault()
        const title = this.state.title
        this.setState({title: ""})
        if (title !== "")
            handleTaskAdded({title: title, parent: task.id})
    }

    render() {
        const {task, onTaskAdded} = this.props
        const {title} = this.state
        return (
            <Form className="my-2"
                  onSubmit={e => this.handleSubmit(e, task, onTaskAdded)}
                  onBlur={e => this.handleSubmit(e, task, onTaskAdded)}>
                <InputGroup className="mt-1">
                    <InputGroupSpacing/>
                    <InputGroupText className="border-0 bg-body py-0">
                        <i className="bi bi-arrow-return-right text-muted"/>
                    </InputGroupText>
                    <Input type="text"
                           placeholder="Add a subtask"
                           value={title}
                           className="border-0 bg-light shadow-none rounded-3 task-input"
                           onChange={e => this.setState({title: e.target.value})}
                           onSubmit={e => this.handleSubmit(e, task, onTaskAdded)}/>
                </InputGroup>
            </Form>
        )
    }

}