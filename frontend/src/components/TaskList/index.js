import React from "react"
import {Card, CardHeader, CardBody, ListGroup} from "reactstrap"
import AddTask from "../AddTask"
import Todo from '../Todo'
import CompletedTasks from "../CompletedTasks";
import {add, remove} from "../../utils/arrays"
import {get, post, patch, del} from "../../utils/client"

export default class TaskList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            taskList: props.taskList,
            todo: [],
            done: []
        }

        this.fetchTasks = this.fetchTasks.bind(this)
        this.handleTaskAdded = this.handleTaskAdded.bind(this)
        this.handleTaskChecked = this.handleTaskChecked.bind(this)
        this.handleTaskEdited = this.handleTaskEdited.bind(this)
        this.handleTaskDeleted = this.handleTaskDeleted.bind(this)
    }

    fetchTasks() {
        get(
            `/api/lists/${this.state.taskList.id}/tasks`,
            result => this.setState({todo: result.todo, done: result.done}),
            _ => this.setState({todo: [], done: []})
        )
    }

    handleTaskAdded(title) {
        this.setState({todo: add(this.state.todo, {key: title, title: title, subtasks: []})})

        post(`/api/lists/${this.state.taskList.id}/tasks`,
            {"title": title},
            _ => this.fetchTasks(),
            _ => this.setState({todo: [], done: []})
        )
    }

    handleTaskChecked(taskId, checked) {
        if (checked) {
            const [task, todo] = remove(this.state.todo, taskId)
            const done = add(this.state.done, task)
            this.setState({todo: todo, done: done})

        } else {
            const [task, done] = remove(this.state.done, taskId)
            const todo = add(this.state.todo, task)
            todo.sort((a, b) => a.position > b.position)
            this.setState({todo: todo, done: done})
        }

        patch(`/api/lists/${this.state.taskList.id}/tasks/${taskId}`,
            {done: checked},
            _ => this.fetchTasks(),
            _ => this.setState({todo: [], done: []})
        )
    }

    handleTaskEdited(taskId, data) {
        patch(`/api/lists/${this.state.taskList.id}/tasks/${taskId}`,
            data,
            _ => this.fetchTasks(),
            _ => this.setState({todo: [], done: []})
        )
    }

    handleTaskDeleted(taskId) {
        const [, done] = remove(this.state.done, taskId)
        this.setState({done: done})

        del(`/api/lists/${this.state.taskList.id}/tasks/${taskId}`,
            _ => this.fetchTasks(),
            _ => this.setState({todo: [], done: []})
        )
    }

    componentDidMount() {
        this.fetchTasks()
    }

    render() {
        const {taskList} = this.props
        const {todo, done} = this.state
        return (
            <Card className="m-3 p-3 shadow">
                <CardHeader className="bg-body border-0">
                    <i className="bi bi-list-check text-secondary me-3"/>
                    <span className="fs-5">{taskList.title}</span>
                </CardHeader>
                <CardBody>
                    <ListGroup>
                        <AddTask taskList={taskList.id} onTaskAdded={this.handleTaskAdded}/>
                        {
                            todo.map(task =>
                                <Todo key={task.id}
                                      task={task}
                                      onTaskChecked={this.handleTaskChecked}
                                      onTaskEdited={this.handleTaskEdited}/>
                            )
                        }
                        <CompletedTasks tasks={done}
                                        onTaskChecked={this.handleTaskChecked}
                                        onTaskDeleted={this.handleTaskDeleted}/>
                    </ListGroup>
                </CardBody>
            </Card>
        )
    }
}