package me.taborda.fullscreentasks.adapters.googletasks

import me.taborda.fullscreentasks.domain.TaskList
import me.taborda.fullscreentasks.domain.TaskListRequest
import me.taborda.fullscreentasks.ports.GoogleTasksPort
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import com.google.api.services.tasks.model.TaskList as GTaskList

@Component
class TaskListsClient(client: GoogleClient) {

    companion object {
        private val logger = LoggerFactory.getLogger(GoogleTasksPort::class.java)
    }

    private val service = client.init()

    fun get(): List<TaskList> {
        return service
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

    fun add(request: TaskListRequest): TaskList {
        return service
            .tasklists()
            .insert(request.toGTaskList())
            .execute()
            .toTaskList()
    }

    fun edit(taskList: String, request: TaskListRequest): TaskList {
        return service
            .tasklists()
            .update(taskList, request.toGTaskList())
            .execute()
            .toTaskList()
    }

    fun delete(taskList: String) {
        service
            .tasklists()
            .delete(taskList)
            .execute()
    }

    private fun GTaskList.toTaskList(): TaskList {
        return TaskList(id, title)
    }

    private fun TaskListRequest.toGTaskList(): GTaskList {
        return GTaskList().setTitle(title)
    }

}