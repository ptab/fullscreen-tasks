import React from "react"
import {InputGroupText} from "reactstrap"

export default class InputGroupDeleteTask extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            hovering: false
        }
    }

    render() {
        const {visible, task, onTaskDeleted} = this.props
        const {hovering} = this.state

        if (visible) {
            let icon = "cursor-hand bi bi-trash"
            if (hovering)
                icon += " text-danger"
            else
                icon += " text-secondary"

            return (
                <InputGroupText className="border-0 bg-body">
                    <i className={icon}
                       onMouseEnter={_ => this.setState({hovering: true})}
                       onMouseLeave={_ => this.setState({hovering: false})}
                       onClick={_ => onTaskDeleted(task)}/>
                </InputGroupText>
            )
        } else {
            return null
        }
    }
}