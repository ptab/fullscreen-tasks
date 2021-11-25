import React from "react"
import {Container, Row} from 'reactstrap'
import TaskList from "./TaskList"
import Login from "./Login"
import Logout from "./Logout"
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            lists: []
        }

        this.fetchAllLists = this.fetchAllLists.bind(this);
        this.handleAddTask = this.handleAddTask.bind(this);
    }

    fetchAllLists() {
        fetch("/api/lists")
            .then(res => res.json())
            .then(
                (result) => this.setState({lists: result}),
                (error) => this.setState({lists: []})
            )
    }

    componentDidMount() {
        this.fetchAllLists()
    }

    handleAddTask(taskList, title) {
        console.log(`/api/lists/${taskList}`)
        fetch(`/api/lists/${taskList}`, {
            method: "POST",
            body: JSON.stringify(title),
            headers: {"Content-Type": "application/json"}
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.fetchAllLists()
                },
                (error) => console.error(error)
            )
    }


    render() {
        const {lists} = this.state

        if (lists.length > 0)
            return <Container>
                <Row className="m-3">
                    {
                        lists.map(taskList => <TaskList key={taskList.id} taskList={taskList} onTaskAdded={this.handleAddTask}/>)
                    }
                </Row>
            </Container>
        else
            return <div>
                <Login/>
                <Logout/>
            </div>
    }
}

export default App
