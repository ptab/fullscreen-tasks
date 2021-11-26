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
        const {task, onTaskChanged, onTaskDeleted} = this.props
        const {hovering} = this.state

        let classes = "border-0 m-1 px-3 py-0"
        let button
        if (hovering) {
            classes += " shadow-sm"
            button = <DeleteTask task={task} onTaskDeleted={onTaskDeleted}/>
        }

        return (
            <ListGroupItem className={classes}
                           onMouseEnter={_ => this.setState({hovering: true})}
                           onMouseLeave={_ => this.setState({hovering: false})}>
                <InputGroup>
                    <Checkbox taskId={task.id}
                              checked
                              onTaskChanged={onTaskChanged}/>
                    <Input type="text"
                           disabled
                           readOnly
                           className="border-0 bg-body text-decoration-line-through"
                           value={task.title}/>
                    {button}
                </InputGroup>
            </ListGroupItem>
        )
    }
}
