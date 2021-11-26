import React from "react"

export default class EditTask extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            editing: false
        }
    }

    render() {
        const {task, onTaskChanged} = this.props
        const {editing} = this.state

        return <i className="hand d-flex align-items-center bi bi-pencil-fill"
                  onClick={_ => this.setState({editing: true})}/>
    }
}