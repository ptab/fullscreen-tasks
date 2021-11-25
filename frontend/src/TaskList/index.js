import {Card, CardHeader, CardBody} from "reactstrap"
import AddTask from "../AddTask"
import Task from '../Task'
import "./style.css"

function TaskList(props) {
    const {taskList, onTaskAdded} = props
    return (
        <Card className="m-3 shadow-sm rounded-top">
            <CardHeader className="bg-info text-center">
                {taskList.title}
            </CardHeader>
            <CardBody>
                <AddTask taskList={taskList.id} onTaskAdded={onTaskAdded}/>
                {taskList.tasks.map(task => <Task key={task.id} task={task}/>)}
            </CardBody>
        </Card>
    )
}

export default TaskList