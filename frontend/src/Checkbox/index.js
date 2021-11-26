import React from "react"
import "../style.css"

export default class Checkbox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            checked: props.checked || false,
            hovering: false
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event, taskId, onTaskChanged) {
        this.setState({checked: !this.state.checked})
        onTaskChanged(taskId, {done: !this.state.checked})
    }

    render() {
        const {taskId, onTaskChanged, inputHovering} = this.props
        const {checked, hovering} = this.state

        let checkbox = "hand d-flex align-items-center me-2"
        if (checked)
            if (hovering)
                checkbox += " bi bi-circle text-secondary"
            else
                checkbox += " bi bi-check2-circle text-primary"
        else if (hovering)
            checkbox += " bi bi-check-lg text-primary"
        else if (inputHovering)
            checkbox += " bi bi-circle text-primary"
        else
            checkbox += " bi bi-circle text-secondary"

        return <i className={checkbox}
                  onMouseEnter={_ => this.setState({hovering: true})}
                  onMouseLeave={_ => this.setState({hovering: false})}
                  onClick={e => this.handleClick(e, taskId, onTaskChanged)}/>
    }
}