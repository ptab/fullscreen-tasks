import {AccordionItem, AccordionHeader, AccordionBody, Accordion, ListGroup} from "reactstrap"
import Done from "../Done"

export default function CompletedTasks(props) {

    const toggleAccordion = () => {
        // TODO replace this with a custom component
        console.log("accordion does not work :(")
    }

    const {taskList, tasks, onTaskChanged, onTaskDeleted} = props
    return (
        <Accordion open={taskList} toggle={toggleAccordion}>
            <AccordionItem>
                <AccordionHeader targetId={taskList}>
                    Completed tasks ({tasks.length})
                </AccordionHeader>
                <AccordionBody accordionId={taskList}>
                    <ListGroup>
                        {
                            tasks.map(task =>
                                <Done key={task.id} task={task} onTaskChanged={onTaskChanged} onTaskDeleted={onTaskDeleted}/>
                            )
                        }
                    </ListGroup>
                </AccordionBody>
            </AccordionItem>
        </Accordion>
    )

}
