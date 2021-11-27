import React from "react";
import {ListGroupItem, Badge} from "reactstrap"
import EditableTaskTitle from "../EditableTaskTitle";
import "../../style.css"

export default class Todo extends React.Component {

    render() {
        const {task, margin, onTaskChecked, onTaskEdited} = this.props

        return (
            <div>
                <ListGroupItem className={`border-0 p-0 ${margin}`}>
                    <EditableTaskTitle task={task}
                                       onTaskChecked={onTaskChecked}
                                       onTaskEdited={onTaskEdited}/>
                    <Description text={task.description}/>
                    <DueBy text={task.dueBy}/>
                </ListGroupItem>
                {
                    task.subtasks.map(subtask =>
                        <Subtask key={subtask.id} task={subtask} onTaskEdited={onTaskEdited}/>
                    )
                }
            </div>
        )
    }
}

function Subtask(props) {
    const {task, onTaskChecked, onTaskEdited} = props
    return <Todo task={task}
                 margin="ms-4"
                 onTaskChecked={onTaskChecked}
                 onTaskEdited={onTaskEdited}/>
}

function Description(props) {
    if (props.text)
        return <p>{props.text}</p>
    else
        return null
}

// TODO properly format this
function DueBy(props) {
    if (props.text)
        return (
            <Badge color="secondary">
                <i className="bi bi-calendar-event me-2"/>
                {props.text}
            </Badge>
        )
    else
        return null
}