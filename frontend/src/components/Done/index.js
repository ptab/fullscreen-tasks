import React from "react"
import {Input, InputGroup, ListGroupItem} from "reactstrap"
import Checkbox from "../Checkbox"
import DeleteTask from "../DeleteTask"

export default class Done extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            hovering: false
        }
    }

    render() {
        const {task, onTaskChecked, onTaskDeleted} = this.props
        const {hovering} = this.state

        let button
        if (hovering) {
            button = <DeleteTask task={task} onTaskDeleted={onTaskDeleted}/>
        }

        return (
            <ListGroupItem className="border-0 p-0">
                <InputGroup onMouseEnter={_ => this.setState({hovering: true})}
                            onMouseLeave={_ => this.setState({hovering: false})}>
                    <Checkbox taskId={task.id}
                              checked
                              onTaskChecked={onTaskChecked}/>
                    <Input type="text"
                           disabled
                           className="border-0 bg-body text-decoration-line-through text-secondary"
                           defaultValue={task.title}/>
                    {button}
                </InputGroup>
            </ListGroupItem>
        )
    }
}
