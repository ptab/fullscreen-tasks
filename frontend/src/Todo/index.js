import {ListGroupItem, Badge, Form, InputGroup, Input} from "reactstrap"
import EditTask from "../EditTask";
import Checkbox from "../Checkbox";
import React from "react";

export default class Todo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            task: props.task,
            title: props.task.title,
            hovering: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleChange(event) {
        this.setState({title: event.target.value})
    }

    handleSubmit(event, onTaskChanged) {
        event.preventDefault()
        const {task, title} = this.state
        if (task.title !== title)
            onTaskChanged(task.id, {title: title})
    }

    render() {
        const {task, margin, onTaskChanged} = this.props
        const {hovering} = this.state
        let classes = `border-0 m-1 px-3 py-0 ${margin}`
        let button
        if (hovering) {
            classes += " shadow-sm"
            button = <EditTask onTaskChanged={onTaskChanged}/>
        }

        return (
            <div>
                <ListGroupItem className={classes}
                               onMouseEnter={_ => this.setState({hovering: true})}
                               onMouseLeave={_ => this.setState({hovering: false})}>
                    <Form onSubmit={e => this.handleSubmit(e, onTaskChanged)}>
                        <InputGroup>
                            <Checkbox taskId={task.id}
                                      onTaskChanged={onTaskChanged}/>
                            <Input type="text"
                                   className="border-0 p"
                                   defaultValue={task.title}
                                   onChange={this.handleChange}
                                   onBlur={e => this.handleSubmit(e, onTaskChanged)}/>
                            {button}
                        </InputGroup>
                    </Form>

                    <Description text={task.description}/>
                    <DueBy text={task.dueBy}/>
                </ListGroupItem>
                {
                    task.subtasks.map(subtask =>
                        <Subtask key={subtask.id} task={subtask} onTaskChanged={onTaskChanged}/>
                    )
                }
            </div>
        )
    }
}

function Subtask(props) {
    const {task, onTaskChanged} = props
    return <Todo task={task} margin="ms-4" onTaskChanged={onTaskChanged}/>
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