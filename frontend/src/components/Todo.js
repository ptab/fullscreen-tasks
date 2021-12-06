import React from "react"
import {ListGroupItem, Form, InputGroup, Input, Collapse} from "reactstrap"
import InputGroupIndicator from "./InputGroupIndicator"
import InputGroupCheckbox from "./InputGroupCheckbox"
import InputGroupDeleteTask from "./InputGroupDeleteTask"
import AddSubtask from "./AddSubtask"
import TaskDetails from "./TaskDetails.js"
import TaskDueBy from "./TaskDueBy"
import TaskActions from "./TaskActions";

export default class Todo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: props.task.title,
            details: props.task.details,
            dueBy: props.task.dueBy,
            hovering: false,
            editing: false
        }

        this.onChange = this.onChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.resetForm = this.resetForm.bind(this)
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit(event, task, handleTaskEdited) {
        event.preventDefault()
        const {title, details, dueBy, editing} = this.state
        if (editing) {
            this.setState({editing: false})
            if (title !== task.title ||
                details !== task.details ||
                dueBy !== task.dueBy)
                handleTaskEdited(task.id, {title: title, details: details, dueBy: dueBy})
        }
    }

    resetForm(task) {
        this.setState({title: task.title, details: task.details || "", dueBy: "" || undefined, editing: false})
    }

    render() {
        const {task, onTaskAdded, onTaskChecked, onTaskEdited, onTaskDeleted} = this.props
        const {title, details, dueBy, hovering, editing} = this.state

        let cursor
        let bgcolor = "bg-body"
        if (editing) {
            cursor = "cursor-text"
            bgcolor = "bg-light"
        } else if (hovering) {
            cursor = "cursor-hand"
        }

        let margin
        let addSubtaskInput
        if (task.parent)
            margin = "ms-5"
        else
            addSubtaskInput = <AddSubtask task={task} onTaskAdded={onTaskAdded}/>

        return (
            <ListGroupItem className={`border-0 pt-0 px-0 ${margin}`}
                           onMouseEnter={_ => this.setState({hovering: true})}
                           onMouseLeave={_ => this.setState({hovering: false})}>
                <Form onSubmit={e => this.handleSubmit(e, task, onTaskEdited)}>
                    <InputGroup>
                        <InputGroupIndicator visible={hovering || editing}
                                             isOpen={editing}
                                             onClick={_ => this.setState({editing: !this.state.editing})}/>
                        <InputGroupCheckbox task={task} hovering={hovering} onTaskChecked={onTaskChecked}/>
                        <Input type="text"
                               name="title"
                               className={`${cursor} border-0 ${bgcolor} shadow-none rounded-3`}
                               value={title}
                               onFocus={_ => this.setState({editing: true})}
                               onChange={this.onChange}/>
                        <InputGroupDeleteTask visible={hovering && !editing} task={task} onTaskDeleted={onTaskDeleted}/>
                    </InputGroup>
                </Form>
                <Collapse isOpen={editing}>
                    <TaskDetails value={details} editable onChange={this.onChange}/>
                    <TaskDueBy value={dueBy} editable onChange={this.onChange}/>
                    {addSubtaskInput}
                    <TaskActions save={e => this.handleSubmit(e, task, onTaskEdited)}
                                 close={_ => this.resetForm(task)}
                                 remove={_ => onTaskDeleted(task)}/>
                </Collapse>
                <Collapse isOpen={!editing}>
                    <TaskDetails value={details}/>
                    <TaskDueBy value={dueBy}/>
                </Collapse>

            </ListGroupItem>
        )
    }
}
