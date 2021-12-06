import {Input, InputGroup, InputGroupText} from "reactstrap";
import InputGroupSpacing from "./InputGroupSpacing";

export default function TaskDueBy(props) {
    const {editable, value, onChange} = props

    if (!editable && !value)
        return null

    const dueBy = new Date(value)

    let color
    if (!editable && dueBy <= Date.now())
        color = "text-warning"
    else
        color = "text-muted"

    let margin
    let component
    if (editable) {
        margin = "mt-1"
        component = <Input type="date"
                           name="dueBy"
                           placeholder="Add due date"
                           value={dueBy}
                           className="border-0 bg-light shadow-none rounded-3 task-input"
                           onChange={onChange}/>
    } else {
        component = (
            <InputGroupText className={`form-control border-0 bg-body py-0 text-start ${color} task-details`}>
                {dueBy.toLocaleString()}
            </InputGroupText>
        )
    }

    return (
        <InputGroup className={margin}>
            <InputGroupSpacing/>
            <InputGroupText className="border-0 bg-body py-0">
                <i className={`bi bi-calendar-event py-0 ${color}`}/>
            </InputGroupText>
            {component}
        </InputGroup>
    )
}
