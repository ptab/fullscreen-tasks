import {Button} from "reactstrap";

export default function TaskActions(props) {
    const {save, close, remove} = props
    return (
        <div className="mt-2">
            <Button outline
                    color="primary"
                    className="btn btn-sm ms-4 me-2"
                    onClick={save}>
                <i className="bi bi-save py-0 me-2"/>
                Save
            </Button>
            <Button outline
                    className="btn btn-sm me-2"
                    onClick={close}>
                <i className="bi bi-x-lg py-0 me-2"/>
                Close
            </Button>
            <Button outline
                    color="danger"
                    className="btn btn-sm"
                    onClick={remove}>
                <i className="bi bi-trash py-0 me-2"/>
                Delete
            </Button>
        </div>
    )
}
