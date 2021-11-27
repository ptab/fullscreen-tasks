import React from "react"
import {ListGroup, Collapse} from "reactstrap"
import Done from "../Done"

export default class CompletedTasks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    render() {
        const {tasks, onTaskChecked, onTaskDeleted} = this.props
        const {open} = this.state

        let chevron
        if (open)
            chevron = <i className="me-3 bi bi-chevron-compact-up"/>
        else
            chevron = <i className="me-3 bi bi-chevron-compact-down"/>

        return (
            <div className="mt-4 text-secondary">
                <p className="hand mb-2" onClick={_ => this.setState({open: !open})}>
                    {chevron}
                    Completed ({tasks.length})
                </p>
                <Collapse isOpen={open}>
                    <ListGroup className="m-0 p-0">
                        {
                            tasks.map(task =>
                                <Done key={task.id}
                                      task={task}
                                      onTaskChecked={onTaskChecked}
                                      onTaskDeleted={onTaskDeleted}/>
                            )
                        }
                    </ListGroup>
                </Collapse>
            </div>
        )
    }
}

