import React from "react"
import {Card, CardHeader, CardBody, ListGroup} from "reactstrap"
import AddTask from "../AddTask"
import Todo from '../Todo'
import CompletedTasks from "../CompletedTasks";

export default class TaskList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: props.taskList.id,
            todo: [],
            done: []
        }

        this.fetchTasks = this.fetchTasks.bind(this);
        this.handleTaskAdded = this.handleTaskAdded.bind(this);
        this.handleTaskChanged = this.handleTaskChanged.bind(this);
        this.handleTaskDeleted = this.handleTaskDeleted.bind(this);
    }

    fetchTasks() {
        fetch(`/api/lists/${this.state.id}/tasks`)
            .then(res => res.json())
            .then(
                (result) => this.setState({todo: result.todo, done: result.done}),
                (error) => this.setState({todo: [], completed: []})
            )
    }

    handleTaskAdded(title) {
        fetch(`/api/lists/${this.state.id}/tasks`, {
            method: "POST",
            body: JSON.stringify({"title": title}),
            headers: {"Content-Type": "application/json"}
        })
            .then(res => res.json())
            .then(
                (result) => this.fetchTasks(),
                (error) => console.error(error)
            )
    }

    handleTaskChanged(taskId, data) {
        fetch(`/api/lists/${this.state.id}/tasks/${taskId}`, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"}
        })
            .then(res => res.json())
            .then(
                (result) => this.fetchTasks(),
                (error) => console.error(error)
            )
    }

    handleTaskDeleted(taskId) {
        fetch(`/api/lists/${this.state.id}/tasks/${taskId}`, {
            method: "DELETE"
        })
            .then(
                (result) => this.fetchTasks(),
                (error) => console.error(error)
            )
    }

    componentDidMount() {
        this.fetchTasks()
    }

    render() {
        const {taskList} = this.props
        const {todo, done} = this.state
        return (
            <Card className="shadow">
                <CardHeader className="bg-info text-center mb-3">
                    {taskList.title}
                </CardHeader>
                <CardBody className="p-0">
                    <ListGroup>
                        <AddTask taskList={taskList.id} onTaskAdded={this.handleTaskAdded}/>
                        {
                            todo.map(task =>
                                <Todo key={task.id} task={task} onTaskChanged={this.handleTaskChanged}/>
                            )
                        }
                        <CompletedTasks tasks={done} onTaskChanged={this.handleTaskChanged} onTaskDeleted={this.handleTaskDeleted}/>
                    </ListGroup>
                </CardBody>
            </Card>
        )
    }
}