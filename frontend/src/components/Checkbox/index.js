import React from "react"

export default class Checkbox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            checked: props.checked || false,
            hovering: false
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event, taskId, onTaskChecked) {
        this.setState({checked: !this.state.checked})
        onTaskChecked(taskId, !this.state.checked)
    }

    render() {
        const {taskId, parentHovering, onTaskChecked} = this.props
        const {checked, hovering} = this.state

        let checkbox = "cursor-hand"
        if (checked)
            if (hovering)
                checkbox += " bi bi-circle text-secondary"
            else
                checkbox += " bi bi-check2-circle text-primary"
        else if (hovering)
            checkbox += " bi bi-check-lg text-primary"
        else if (parentHovering)
            checkbox += " bi bi-circle text-primary"
        else
            checkbox += " bi bi-circle text-secondary"

        return <i className={checkbox}
                  onMouseEnter={_ => this.setState({hovering: true})}
                  onMouseLeave={_ => this.setState({hovering: false})}
                  onClick={e => this.handleClick(e, taskId, onTaskChecked)}/>
    }
}