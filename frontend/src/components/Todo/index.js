import React from "react"
import {ListGroupItem, Form, InputGroup, Input, Collapse, InputGroupText, Button} from "reactstrap"
import InputGroupIndicator from "../InputGroupIndicator"
import InputGroupCheckbox from "../InputGroupCheckbox"
import InputGroupDeleteTask from "../InputGroupDeleteTask"
import AddSubtask from "../AddSubtask"
import "./style.css"

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
            <div>
                <ListGroupItem className={`border-0 pt-0 px-0 ${margin}`}
                               onMouseEnter={_ => this.setState({hovering: true})}
                               onMouseLeave={_ => this.setState({hovering: false})}>
                    <Form onSubmit={e => this.handleSubmit(e, task, onTaskEdited)}>
                        <InputGroup>
                            <InputGroupIndicator visible={hovering || editing}/>
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
                        <Description value={details} editable onChange={this.onChange}/>
                        <DueBy value={dueBy} editable onChange={this.onChange}/>
                        {addSubtaskInput}
                        <Actions save={e => this.handleSubmit(e, task, onTaskEdited)}
                                 close={_ => this.resetForm(task)}
                                 remove={_ => onTaskDeleted(task)}/>
                    </Collapse>
                    <Collapse isOpen={!editing}>
                        <Description value={details}/>
                        <DueBy value={dueBy}/>
                    </Collapse>

                </ListGroupItem>
                {
                    task.subtasks.map(subtask =>
                        <Todo key={subtask.id}
                              task={subtask}
                              onTaskAdded={onTaskAdded}
                              onTaskChecked={onTaskChecked}
                              onTaskEdited={onTaskEdited}
                              onTaskDeleted={onTaskDeleted}/>
                    )
                }
            </div>
        )
    }
}


function Description(props) {
    const {editable, value, onChange} = props

    if (!editable && !value)
        return null

    let margin
    let component
    if (editable) {
        margin = "mt-1"
        component = <Input type="textarea"
                           name="details"
                           placeholder="Add details"
                           value={value}
                           className="border-0 bg-light shadow-none rounded-3"
                           style={{fontSize: 0.80 + "rem"}}
                           onChange={onChange}/>
    } else if (value) {
        component = (
            <InputGroupText className="form-control border-0 bg-body text-start text-muted">
                <span className="task-details">{value}</span>
            </InputGroupText>
        )
    }

    return (
        <InputGroup className={margin}>
            <InputGroupIndicator/>
            <InputGroupText className="border-0 bg-body py-0">
                <i className="bi bi-card-text text-muted"/>
            </InputGroupText>
            {component}
        </InputGroup>
    )
}

function DueBy(props) {
    const {editable, value, onChange} = props

    if (!editable && !value)
        return null

    const dueBy = new Date(value)

    let color
    if (!editable && dueBy <= Date.now())
        color = "text-warning"
    else
        color = "text-muted"

    let margin
    let component
    if (editable) {
        margin = "mt-1"
        component = <Input type="date"
                           name="dueBy"
                           placeholder="Add due date"
                           value={dueBy}
                           className="border-0 bg-light shadow-none rounded-3"
                           style={{fontSize: 0.80 + "rem"}}
                           onChange={onChange}/>
    } else {
        component = (
            <InputGroupText className={`form-control border-0 bg-body text-start ${color}`}>
                <span className="task-details">{dueBy.toLocaleString()}</span>
            </InputGroupText>
        )
    }

    return (
        <InputGroup className={margin}>
            <InputGroupIndicator/>
            <InputGroupText className="border-0 bg-body py-0">
                <i className={`bi bi-calendar-event py-0 ${color}`}/>
            </InputGroupText>
            {component}
        </InputGroup>
    )
}

function Actions(props) {
    const {save, close, remove} = props
    return (
        <div className="mt-2">
            <Button outline
                    color="primary"
                    className="btn btn-sm ms-4 me-2"
                    onClick={save}>
                <i className="bi bi-save py-0 me-2"/>
                Save
            </Button>
            <Button outline
                    className="btn btn-sm me-2"
                    onClick={close}>
                <i className="bi bi-x-lg py-0 me-2"/>
                Close
            </Button>
            <Button outline
                    color="danger"
                    className="btn btn-sm"
                    onClick={remove}>
                <i className="bi bi-trash py-0 me-2"/>
                Delete
            </Button>
        </div>
    )
}
