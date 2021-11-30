import React from "react"
import {InputGroupText} from "reactstrap"

export default function InputGroupIndicator(props) {
    let visibility
    if (props.visible)
        visibility = "visible"
    else
        visibility = "invisible"

    return (
        <InputGroupText className="border-0 bg-body p-0">
            <i className={`bi bi-chevron-compact-right text-primary ${visibility}`}/>
        </InputGroupText>
    )
}
