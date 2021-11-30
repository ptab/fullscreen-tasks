import React from "react"
import {InputGroupText} from "reactstrap"

export default function InputGroupIndicator(props) {
    const {visible} = props
    let className = "bi bi-chevron-compact-right text-primary"
    if (!visible)
        className += " invisible"

    return (
        <InputGroupText className="border-0 bg-body px-1">
            <i className={className}/>
        </InputGroupText>
    )
}
