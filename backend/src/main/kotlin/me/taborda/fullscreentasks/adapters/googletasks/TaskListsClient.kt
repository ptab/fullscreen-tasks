package me.taborda.fullscreentasks.adapters.googletasks

import me.taborda.fullscreentasks.domain.EditTaskListRequest
import me.taborda.fullscreentasks.domain.TaskList
import me.taborda.fullscreentasks.ports.GoogleTasksPort
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import com.google.api.services.tasks.Tasks as GoogleTasks
import com.google.api.services.tasks.model.TaskList as GTaskList

@Component
class TaskListsClient(private val client: GoogleTasks) {

    companion object {
        private val logger = LoggerFactory.getLogger(GoogleTasksPort::class.java)
    }

    fun get(): List<TaskList> {
        return client
            .tasklists()
            .list()
            .execute()
            .items
            .orEmpty()
            .filterNotNull()
            .map { taskList ->
                TaskList(
                    id = taskList.id,
                    title = taskList.title
                )
            }
    }

    fun add(request: EditTaskListRequest): TaskList {
        return client
            .tasklists()
            .insert(request.toGTaskList())
            .execute()
            .toTaskList()
    }

    fun edit(taskList: String, request: EditTaskListRequest): TaskList {
        return client
            .tasklists()
            .update(taskList, request.toGTaskList())
            .execute()
            .toTaskList()
    }

    fun delete(taskList: String) {
        client
            .tasklists()
            .delete(taskList)
            .execute()
    }

    private fun GTaskList.toTaskList(): TaskList {
        return TaskList(id, title)
    }

    private fun EditTaskListRequest.toGTaskList(): GTaskList {
        return GTaskList().setTitle(title)
    }

}