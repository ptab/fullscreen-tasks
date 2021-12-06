import React from "react"
import {Card, CardHeader, CardBody, ListGroup, CardFooter, Spinner} from "reactstrap"
import AddTask from "./AddTask"
import Todo from './Todo'
import CompletedTasks from "./CompletedTasks";
import {get, post, patch, del} from "../utils/client"

export default class TaskList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
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
            result => this.setState({todo: result.todo, done: result.done, loading: false}),
            _ => this.setState({todo: [], done: [], loading: false})
        )
    }

    handleTaskAdded(task) {
        const data = {key: task.id || task.title, title: task.title, subtasks: []}
        if (task.parent) {
            const [parent, todo] = removeTask(this.state.todo, task.parent)
            parent.subtasks.unshift(data)
            todo.push(parent)
            todo.sort((a, b) => a.position > b.position)
            this.setState({todo: todo})
        } else {
            const todo = addTask(this.state.todo, data)
            this.setState({todo: todo})
        }

        post(`/api/lists/${this.state.taskList.id}/tasks`,
            task,
            _ => this.fetchTasks(),
            _ => this.setState({todo: [], done: [], loading: false})
        )
    }

    handleTaskChecked(task, checked) {
        if (checked) {
            const [, todo] = removeTask(this.state.todo, task.id)
            const done = addTask(this.state.done, task)
            this.setState({todo: todo, done: done})

        } else if (task.parent) {
            const [, done] = removeTask(this.state.done, task.id)
            const [parent, todo] = removeTask(this.state.todo, task.parent)
            if (parent) {
                parent.subtasks.unshift(task)
                parent.subtasks.sort((a, b) => a.position > b.position)
                todo.push(parent)
                todo.sort((a, b) => a.position > b.position)
                this.setState({todo: todo, done: done})
            } else {
                todo.push(task)
                todo.sort((a, b) => a.position > b.position)
                this.setState({todo: todo, done: done})
            }

        } else {
            const [, done] = removeTask(this.state.done, task.id)
            const todo = addTask(this.state.todo, task)
            todo.sort((a, b) => a.position > b.position)
            this.setState({todo: todo, done: done})
        }

        patch(`/api/lists/${this.state.taskList.id}/tasks/${task.id}`,
            {done: checked},
            _ => this.fetchTasks(),
            _ => this.setState({todo: [], done: [], loading: false})
        )
    }

    handleTaskEdited(taskId, data) {
        patch(`/api/lists/${this.state.taskList.id}/tasks/${taskId}`,
            data,
            _ => this.fetchTasks(),
            _ => this.setState({todo: [], done: [], loading: false})
        )
    }

    handleTaskDeleted(task) {
        if (task.done) {
            const [, done] = removeTask(this.state.done, task.id)
            this.setState({done: done})
        } else {
            const [, todo] = removeTask(this.state.todo, task.id)
            this.setState({todo: todo})
        }

        del(`/api/lists/${this.state.taskList.id}/tasks/${task.id}`,
            _ => this.fetchTasks(),
            _ => this.setState({todo: [], done: [], loading: false})
        )
    }

    componentDidMount() {
        this.fetchTasks()
    }

    render() {
        const {loading, taskList, todo, done} = this.state

        let body, footer
        if (loading)
            body = (
                <div className="d-flex justify-content-center align-items-center my-5">
                    <Spinner className="text-primary"/>
                </div>
            )
        else {
            body = (
                <CardBody>
                    <AddTask taskList={taskList.id} onTaskAdded={this.handleTaskAdded}/>
                    <ListGroup>
                        {
                            todo.map(task =>
                                <Todo key={task.id}
                                      task={task}
                                      onTaskAdded={this.handleTaskAdded}
                                      onTaskChecked={this.handleTaskChecked}
                                      onTaskEdited={this.handleTaskEdited}
                                      onTaskDeleted={this.handleTaskDeleted}/>
                            )
                        }
                    </ListGroup>
                </CardBody>
            )
            footer = (
                <CardFooter className="border-0 bg-body">
                    <CompletedTasks taskList={taskList}
                                    done={done}
                                    onTaskChecked={this.handleTaskChecked}
                                    onTaskDeleted={this.handleTaskDeleted}/>
                </CardFooter>
            )
        }

        return (
            <Card className="m-3 p-3 shadow">
                <CardHeader className="border-0 bg-body title fs-5">
                    <i className="bi bi-card-checklist muted me-3"/>
                    {taskList.title}
                </CardHeader>
                {body}
                {footer}
            </Card>
        )
    }
}

function addTask(arr, task) {
    const copy = arr
    copy.unshift(task)
    return copy
}

function removeTask(arr, taskId) {
    return [
        arr.find(t => t.id === taskId),
        arr.filter(t => t.id !== taskId)
    ]
}