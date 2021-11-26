import React from "react"
import {Container, Row, Spinner} from 'reactstrap'
import TaskList from "./TaskList"

export default class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            lists: []
        }

        this.fetchAllLists = this.fetchAllLists.bind(this);
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

    render() {
        const {lists} = this.state

        if (lists.length > 0)
            return <Container>
                {
                    lists.map(taskList =>
                        <Row key={taskList.id} className="m-3">
                            <TaskList taskList={taskList} onTaskAdded={this.handleAddTask}/>
                        </Row>
                    )
                }
            </Container>
        else
            return <Container>
                <Row>
                    <Spinner/>
                </Row>
            </Container>
    }
}
