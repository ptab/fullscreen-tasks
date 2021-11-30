import React from "react"
import {Input, InputGroup, ListGroupItem} from "reactstrap"
import InputGroupCheckbox from "../InputGroupCheckbox";
import InputGroupIndicator from "../InputGroupIndicator";
import InputGroupDeleteTask from "../InputGroupDeleteTask"

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

        return (
            <ListGroupItem className="border-0 p-0">
                <InputGroup onMouseEnter={_ => this.setState({hovering: true})}
                            onMouseLeave={_ => this.setState({hovering: false})}>
                    <InputGroupIndicator visible={hovering}/>
                    <InputGroupCheckbox task={task} checked hovering onTaskChecked={onTaskChecked}/>
                    <Input type="text"
                           disabled
                           className="border-0 bg-body text-decoration-line-through text-muted"
                           defaultValue={task.title}/>
                    <InputGroupDeleteTask visible={hovering} task={task} onTaskDeleted={onTaskDeleted}/>
                </InputGroup>
            </ListGroupItem>
        )
    }
}
