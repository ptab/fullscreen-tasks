import React from "react"
import {InputGroupText} from "reactstrap"

export default function InputGroupIndicator(props) {
    const {visible, isOpen, onClick} = props

    let visibility, icon
    if (visible) {
        visibility = "visible"
        if (isOpen)
            icon = "bi-chevron-compact-down"
        else
            icon = "bi-chevron-compact-right"
    } else {
        visibility = "invisible"
        icon = "bi-chevron-compact-right"
    }

    let cursor
    if (onClick != null)
        cursor = "cursor-hand"

    return (
        <InputGroupText className="border-0 bg-body p-0">
            <i className={`${visibility} bi ${icon} text-primary ${cursor}`} onClick={onClick}/>
        </InputGroupText>
    )
}
