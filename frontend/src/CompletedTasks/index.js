import React from "react"
import {ListGroup, Collapse, Card, CardBody, CardHeader} from "reactstrap"
import Done from "../Done"

export default class CompletedTasks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    render() {
        const {tasks, onTaskChanged, onTaskDeleted} = this.props
        const {open} = this.state

        let chevron
        if (open)
            chevron = <i className="ms-1 me-3 bi bi-chevron-compact-up"/>
        else
            chevron = <i className="ms-1 me-3 bi bi-chevron-compact-down"/>

        return (
            <Card className="my-2 bg-body border-0 text-secondary">
                <CardHeader className="hand border-0 bg-body" onClick={_ => this.setState({open: !open})}>
                    {chevron}
                    Completed ({tasks.length})
                </CardHeader>
                <Collapse isOpen={open}>
                    <CardBody className="m-0 p-0">
                        <ListGroup className="m-0 p-0">
                            {
                                tasks.map(task =>
                                    <Done key={task.id} task={task} onTaskChanged={onTaskChanged} onTaskDeleted={onTaskDeleted}/>
                                )
                            }
                        </ListGroup>
                    </CardBody>
                </Collapse>
            </Card>
        )
    }
}

