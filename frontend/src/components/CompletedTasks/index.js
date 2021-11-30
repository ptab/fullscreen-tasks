import React from "react"
import {ListGroup, Collapse} from "reactstrap"
import Done from "../Done"

export default class CompletedTasks extends React.Component {

    constructor(props) {
        super(props);
        this.state = JSON.parse(localStorage.getItem(`CompletedTasks.${props.taskList.id}`)) || {
            open: false,
            taskList: props.taskList.id
        }
    }

    setState(state) {
        super.setState(state, () => {
            localStorage.setItem(`CompletedTasks.${this.state.taskList}`, JSON.stringify(this.state));
        });
    }

    render() {
        const {done, onTaskChecked, onTaskDeleted} = this.props
        const {open} = this.state

        let chevron
        if (open)
            chevron = <i className="bi bi-chevron-compact-up me-3"/>
        else
            chevron = <i className="bi bi-chevron-compact-down me-3"/>

        return (
            <div className="text-secondary cursor-hand">
                 <span className="list-title" onClick={_ => this.setState({open: !open})}>
                     {chevron}
                     Completed ({done.length})
                 </span>
                <Collapse isOpen={open}>
                    <ListGroup className="mt-2">
                        {
                            done.map(task =>
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

