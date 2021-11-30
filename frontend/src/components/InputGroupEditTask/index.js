import React from "react"
import {Button, Form, Input, InputGroup, InputGroupText, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap"

export default class InputGroupEditTask extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: props.task.title,
            details: props.task.description,
            dueBy: props.task.dueBy,
            hovering: false,
            parentHovering: false,
            editing: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event, task, handleTaskEdited) {
        event.preventDefault()
        const {title, details, dueBy, editing} = this.state
        if (editing) {
            this.setState({editing: false})
            const data = {
                title: title,
                details: details,
                dueBy: dueBy,
            }
            if (data !== task)
                handleTaskEdited(task.id, data)
        }
    }

    render() {
        const {task, parentEditing, visible, onTaskEdited, onTaskDeleted} = this.props
        const {hovering, editing} = this.state

        let icon = "cursor-hand bi bi-pencil"
        if (hovering || parentEditing)
            icon += " text-primary"
        else
            icon += " text-secondary"

        if (visible)
            return (
                <InputGroupText className="border-0 bg-body">
                    <i className={icon}
                       onMouseEnter={_ => this.setState({hovering: true})}
                       onMouseLeave={_ => this.setState({hovering: false})}
                       onClick={_ => this.setState({editing: true})}/>

                    <Modal isOpen={editing} centered>
                        <ModalHeader className="border-0" toggle={_ => this.setState({editing: false})}/>
                        <ModalBody>
                            <Form onSubmit={e => this.handleSubmit(e, task, onTaskEdited)}>
                                <InputGroup className="mb-3">
                                    <InputGroupText className="border-0 bg-body">
                                        <i className="bi bi-check-circle"/>
                                    </InputGroupText>
                                    <Input type="text"
                                           name="title"
                                           placeholder="Title"
                                           defaultValue={task.title}
                                           onChange={e => this.setState({[e.target.name]: e.target.value})}/>
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroupText className="border-0 bg-body">
                                        <i className="bi bi-card-text"/>
                                    </InputGroupText>
                                    <Input type="textarea"
                                           name="details"
                                           placeholder="Add details"
                                           defaultValue={task.details}
                                           onChange={e => this.setState({[e.target.name]: e.target.value})}/>
                                </InputGroup>
                                <InputGroup>
                                    <InputGroupText className="border-0 bg-body">
                                        <i className="bi bi-calendar-event"/>
                                    </InputGroupText>
                                    <Input type="date"
                                           name="dueBy"
                                           onChange={e => this.setState({[e.target.name]: e.target.value})}/>
                                </InputGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter className="border-0">
                            <Button outline color="primary" onClick={e => this.handleSubmit(e, task, onTaskEdited)}>
                                <i className="bi bi-save"/>
                            </Button>
                            <Button outline color="danger" onClick={_ => onTaskDeleted(task)}>
                                <i className="bi bi-trash"/>
                            </Button>
                        </ModalFooter>
                    </Modal>
                </InputGroupText>
            )
        else
            return null
    }
}