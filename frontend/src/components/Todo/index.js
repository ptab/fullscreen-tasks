import React from "react"
import {ListGroupItem, Form, InputGroup, Input} from "reactstrap"
import InputGroupIndicator from "../InputGroupIndicator"
import InputGroupCheckbox from "../InputGroupCheckbox"
import InputGroupEditTask from "../InputGroupEditTask"
import "./style.css"

export default class Todo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: props.task.title,
            hovering: false,
            editing: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event, task, handleTaskEdited) {
        event.preventDefault()
        const {title, editing} = this.state
        if (editing) {
            this.setState({editing: false})
            if (title !== task.title)
                handleTaskEdited(task.id, {title: title})
        }
    }

    // FIXME forced to use this because I can't get the Input component to re-render when props.task.title changes
    componentDidUpdate(previous) {
        const {task} = this.props
        if (task.title !== previous.task.title) {
            console.log("title changed, will update!")
            this.setState({title: task.title})
        }
    }

    render() {
        const {task, margin, onTaskChecked, onTaskEdited, onTaskDeleted} = this.props
        const {title, hovering, editing} = this.state

        let input = "border-0 shadow-none"
        if (editing)
            input += " cursor-text"
        else if (hovering)
            input += " cursor-hand"

        return (
            <div>
                <ListGroupItem className={`border-0 p-0 ${margin}`}>
                    <Form onSubmit={e => this.handleSubmit(e, task, onTaskEdited)}>
                        <InputGroup onMouseEnter={_ => this.setState({hovering: true})}
                                    onMouseLeave={_ => this.setState({hovering: false})}>
                            <InputGroupIndicator visible={hovering || editing}/>
                            <InputGroupCheckbox task={task} hovering={hovering} onTaskChecked={onTaskChecked}/>
                            <Input type="text"
                                   className={input}
                                   value={title}
                                   onFocus={_ => this.setState({editing: true})}
                                   onChange={e => this.setState({title: e.target.value})}
                                   onBlur={e => this.handleSubmit(e, task, onTaskEdited)}/>
                            <InputGroupEditTask visible={hovering || editing}
                                                parentEditing={editing}
                                                task={task}
                                                onTaskEdited={onTaskEdited}
                                                onTaskDeleted={onTaskDeleted}/>
                        </InputGroup>
                    </Form>
                    <Details task={task} />

                </ListGroupItem>
                {
                    task.subtasks.map(subtask =>
                        <Subtask key={subtask.id}
                                 task={subtask}
                                 onTaskChecked={onTaskChecked}
                                 onTaskEdited={onTaskEdited}
                                 onTaskDeleted={onTaskDeleted}/>
                    )
                }
            </div>
        )
    }
}

function Subtask(props) {
    const {task, onTaskChecked, onTaskEdited, onTaskDeleted} = props
    return <Todo
        margin="ms-4"
        task={task}
        onTaskChecked={onTaskChecked}
        onTaskEdited={onTaskEdited}
        onTaskDeleted={onTaskDeleted}/>
}

function Details(props) {
    if (props.task.details || props.task.dueBy)
        return (
            <div className="ms-5 ps-3 mb-3">
                <Description text={props.task.details}/>
                <DueBy text={props.task.dueBy}/>
            </div>
        )
    else
        return null
}

function Description(props) {
    if (props.text)
        return (
            <div className="task-details text-secondary">
                <i className="d-inline-flex align-middle bi bi-card-text me-2"/>
                <span className="d-inline-flex align-middle ">{props.text}</span>
            </div>
        )
    else
        return null
}

function DueBy(props) {
    const dueBy = new Date(props.text)

    let classname = "task-details border border-1 px-1 rounded d-inline-flex align-middle"
    if (dueBy <= Date.now())
        classname += " text-danger border-danger"
    else
        classname += " text-secondary border-secondary"

    if (props.text)
        return (
            <span className={classname}>
                <i className="bi bi-calendar-event me-2"/>
                {dueBy.toLocaleString()}
            </span>
        )
    else
        return null
}