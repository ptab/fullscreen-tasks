import React from "react"

export default class DeleteTask extends React.Component {

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e, task, onTaskDeleted) {
        this.setState({editing: true})
        onTaskDeleted(task.id)
    }

    render() {
        const {task, onTaskDeleted} = this.props
        return <i className="hand d-flex align-items-center bi bi-trash-fill"
                  onClick={e => this.handleClick(e, task, onTaskDeleted)}/>
    }
}