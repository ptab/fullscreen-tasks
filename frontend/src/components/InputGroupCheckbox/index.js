import React from "react"
import {InputGroupText} from "reactstrap"
import Checkbox from "../Checkbox"

export default function InputGroupCheckbox(props) {
    const {task, checked, hovering, onTaskChecked} = props
    return (
        <InputGroupText className="border-0 bg-body px-1">
            <Checkbox taskId={task.id}
                      checked={checked}
                      parentHovering={hovering}
                      onTaskChecked={onTaskChecked}/>
        </InputGroupText>
    )
}
