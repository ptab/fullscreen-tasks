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

    handleClick(event, taskId, onTaskChanged) {
        this.setState({checked: !this.state.checked})
        onTaskChanged(taskId, {done: !this.state.checked})
    }

    render() {
        const {taskId, onTaskChanged} = this.props
        const {checked, hovering} = this.state

        let classes = "d-flex align-items-center me-2"
        if (checked)
            classes += " bi bi-check2-circle text-primary"
        else if (hovering)
            classes += " bi bi-check-lg text-primary"
        else
            classes += " bi bi-circle text-secondary"

        return <i className={classes}
                  onMouseEnter={_ => this.setState({hovering: true})}
                  onMouseLeave={_ => this.setState({hovering: false})}
                  onClick={e => this.handleClick(e, taskId, onTaskChanged)}/>
    }
}