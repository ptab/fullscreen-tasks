import React from "react"

export default class EditTask extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            editing: false
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState({editing: true})
    }

    render() {
        const {task, onTaskChanged} = this.props
        const {editing} = this.state

        return <i className="d-flex align-items-center bi bi-pencil-fill"
                  onClick={this.handleClick}/>
    }
}