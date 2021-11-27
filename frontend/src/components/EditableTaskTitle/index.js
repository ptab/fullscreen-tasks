import React from "react";
import {Form, Input, InputGroup} from "reactstrap"
import Checkbox from "../Checkbox";
import EditTask from "../EditTask";
import "../../style.css"

export default class EditableTaskTitle extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            task: props.task,
            value: props.task.title,
            hovering: false,
            editing: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event, onTaskEdited) {
        event.preventDefault()
        event.target.blur()
        const {task, value} = this.state
        if (task.title !== value)
            onTaskEdited(task.id, {title: value})
    }

    render() {
        const {onTaskChecked, onTaskEdited} = this.props
        const {task, hovering} = this.state

        let classes = "hand border-0 shadow-none"
        let button
        if (hovering) {
            classes += " text-primary"
            button = <EditTask onTaskEdited={onTaskEdited}/>
        }

        return (
            <Form onSubmit={e => this.handleSubmit(e, onTaskEdited)}>
                <InputGroup onMouseEnter={_ => this.setState({hovering: true})}
                            onMouseLeave={_ => this.setState({hovering: false})}>
                    <Checkbox taskId={task.id}
                              parentHovering={hovering}
                              onTaskChecked={onTaskChecked}/>
                    <Input type="text"
                           className={classes}
                           defaultValue={task.title}
                           onChange={e => this.setState({value: e.target.value})}
                           onBlur={e => this.handleSubmit(e, onTaskEdited)}/>
                    {button}
                </InputGroup>
            </Form>
        )
    }
}