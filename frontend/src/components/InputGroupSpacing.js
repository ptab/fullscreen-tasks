import React from "react"
import {InputGroupText} from "reactstrap"

export default function InputGroupSpacing() {
    return (
        <InputGroupText className="border-0 bg-body p-0">
            <i className={`bi bi-chevron-compact-right invisible`}/>
        </InputGroupText>
    )
}
