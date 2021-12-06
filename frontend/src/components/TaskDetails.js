import {Input, InputGroup, InputGroupText} from "reactstrap";
import InputGroupSpacing from "./InputGroupSpacing";

export default function TaskDetails(props) {
    const {editable, value, onChange} = props

    if (!editable && !value)
        return null

    let margin
    let component
    if (editable) {
        margin = "mt-1"
        component = <Input type="textarea"
                           name="details"
                           placeholder="Add details"
                           defaultValue={value}
                           className="border-0 bg-light shadow-none rounded-3 task-input"
                           onChange={onChange}/>
    } else if (value) {
        component = (
            <InputGroupText className="form-control border-0 bg-body py-0 text-start text-muted task-details">
                {value}
            </InputGroupText>
        )
    }

    return (
        <InputGroup className={margin}>
            <InputGroupSpacing/>
            <InputGroupText className="border-0 bg-body py-0">
                <i className="bi bi-card-text text-muted"/>
            </InputGroupText>
            {component}
        </InputGroup>
    )
}
