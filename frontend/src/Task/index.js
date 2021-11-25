import React from "react"
import {Input, Label, Card, CardTitle, CardSubtitle} from "reactstrap"
import "./style.css"

function Task(props) {
    const {task} = props

    let component
    if (task.done)
        component = <Done task={task}/>
    else
        component = <Todo task={task}/>

    return (
        <div>
            {component}
            {task.subtasks.map(subtask => <Subtask key={subtask.id} task={subtask}/>)}
        </div>
    )
}

function Subtask(props) {
    const {task} = props

    if (task.done)
        return <Done task={task} margin="ms-4"/>
    else
        return <Todo task={task} margin="ms-4"/>
}


function Done(props) {
    const {task, margin} = props
    const classname = " border-0 " + margin
    return (
        <Card className={classname}>
            <CardTitle className="mb-0">
                <Input type="checkbox" defaultChecked className="me-2"/>
                <Label check className="text-decoration-line-through">{task.title}</Label>
            </CardTitle>
        </Card>
    )
}

function Todo(props) {
    const {task, margin} = props
    const classname = "border-0 " + margin
    return (
        <Card body className={classname}>
            <CardTitle className="mb-0">
                <Input type="checkbox" className="me-2"/>
                <Label check>{task.title}</Label>
            </CardTitle>
            <CardSubtitle>
                <div>📝 {task.description}</div>
                <div>🗓 {task.dueBy}</div>
            </CardSubtitle>
        </Card>
    )
}


export default Task