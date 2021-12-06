import React from "react"
import {Container, Row, Spinner} from 'reactstrap'
import TaskList from "./components/TaskList"
import Header from "./components/Header"

export default class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            lists: []
        }

        this.fetchUser = this.fetchUser.bind(this);
        this.fetchAllLists = this.fetchAllLists.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    fetchUser() {
        fetch("/api/user")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({user: result, loading: false})
                    this.fetchAllLists()
                },
                (error) => this.setState({lists: [], loading: false})
            )
    }

    fetchAllLists() {
        fetch("/api/lists")
            .then(res => res.json())
            .then(
                (result) => this.setState({lists: result, loading: false}),
                (error) => this.setState({lists: [], loading: false})
            )
    }

    refresh() {
        this.setState({loading: true})
        this.fetchAllLists()
    }

    componentDidMount() {
        this.fetchUser()
    }

    render() {
        const {loading, user, lists} = this.state

        let content
        if (loading)
            content = <Loading/>
        else if (user)
            content = <Lists lists={lists}/>
        else
            content = <LoginRequired/>

        return (
            <div>
                <Header user={user} onRefresh={this.refresh}/>
                {content}
            </div>
        )
    }
}

function Loading() {
    return (
        <div className="d-flex min-vh-100 justify-content-center align-items-center">
            <Spinner className="text-primary"/>
        </div>
    )
}

function LoginRequired() {
    return (
        <div className="d-flex min-vh-100 justify-content-center align-items-center">
            <a className="btn btn-primary btn-lg" href="/oauth2/authorization/google" role="button">
                <i className="bi bi-google me-3"/>
                Login with Google
            </a>
        </div>
    )
}


function Lists(props) {
    const {lists} = props
    if (lists.length > 0)
        return (
            <Container>
                {
                    lists.map(taskList =>
                        <Row key={taskList.id}>
                            <TaskList taskList={taskList}/>
                        </Row>
                    )
                }
            </Container>
        )
    else
        return (
            <div className="d-flex min-vh-100 justify-content-center align-items-center">
                <p>You have no lists, create one!</p>
                <p>TODO</p>
            </div>
        )
}
