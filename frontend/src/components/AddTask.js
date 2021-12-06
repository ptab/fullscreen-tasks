import React from "react"
import {Input, Form, InputGroup, InputGroupText} from "reactstrap"
import InputGroupSpacing from "./InputGroupSpacing";

export default class AddTask extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: "",
            hovering: false,
            editing: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event, handleTaskAdded) {
        event.preventDefault()
        const title = this.state.title
        this.setState({title: "", editing: false})
        if (title !== "") {
            handleTaskAdded({title: title})
        }
    }

    render() {
        const {onTaskAdded} = this.props
        const {title, hovering, editing} = this.state

        let cursor
        let textcolor
        let button
        if (editing) {
            cursor = "cursor-text"
            button = "bi bi-plus-circle-fill"
        } else if (hovering) {
            cursor = "cursor-hand"
            textcolor = "text-primary"
            button = "bi bi-plus"
        } else {
            cursor = "cursor-hand"
            button = "bi bi-plus"
        }

        return (
            <Form className="my-2"
                  onSubmit={e => this.handleSubmit(e, onTaskAdded)}
                  onBlur={e => this.handleSubmit(e, onTaskAdded)}>
                <InputGroup>
                    <InputGroupSpacing/>
                    <InputGroupText className="border-0 bg-body py-0">
                        <i className={`cursor-hand ${button} text-primary`}
                           onMouseEnter={_ => this.setState({hovering: true})}
                           onMouseLeave={_ => this.setState({hovering: false})}
                           onClick={e => this.handleSubmit(e, onTaskAdded)}/>
                    </InputGroupText>
                    <Input type="text"
                           className={`${cursor} border-0 shadow-none ${textcolor}`}
                           placeholder="Add a task"
                           value={title}
                           onFocus={_ => this.setState({editing: true})}
                           onChange={e => this.setState({title: e.target.value})}/>
                </InputGroup>
            </Form>
        )
    }

}