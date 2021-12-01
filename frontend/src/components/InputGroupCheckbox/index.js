import React from "react"
import {InputGroupText} from "reactstrap"
import Checkbox from "../Checkbox"

export default function InputGroupCheckbox(props) {
    const {task, checked, hovering, onTaskChecked} = props
    return (
        <InputGroupText className="border-0 bg-body py-0">
            <Checkbox task={task}
                      checked={checked}
                      parentHovering={hovering}
                      onTaskChecked={onTaskChecked}/>
        </InputGroupText>
    )
}
