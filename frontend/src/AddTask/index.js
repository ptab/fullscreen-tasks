import React from "react"
import {Input, Form, Button} from "reactstrap"
import "./style.css"

class AddTask extends React.Component {

    constructor(props) {
        super(props)
        this.state = {title: ''}

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({title: event.target.value})
    }

    handleSubmit(event, taskList, onTaskAdded) {
        event.preventDefault()
        onTaskAdded(taskList, this.state.title)
    }

    render() {
        const {taskList, onTaskAdded} = this.props
        return (
            <Form className="row row-cols-lg-auto" onSubmit={e => this.handleSubmit(e, taskList, onTaskAdded)}>
                <Button>+</Button>
                <div>
                    <Input placeholder="Add a task" value={this.state.title} onChange={this.handleChange}/>
                </div>
            </Form>
        )
    }

}

export default AddTask