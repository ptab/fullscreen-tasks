package me.taborda.fullscreentasks.adapters.googletasks

import me.taborda.fullscreentasks.domain.Task
import me.taborda.fullscreentasks.domain.TaskRequest
import me.taborda.fullscreentasks.domain.Tasks
import me.taborda.fullscreentasks.ports.GoogleTasksPort
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import java.time.Instant
import java.time.format.DateTimeFormatter
import com.google.api.services.tasks.model.Task as GTask

@Component
class TasksClient(client: GoogleClient) {

    companion object {
        private val logger = LoggerFactory.getLogger(GoogleTasksPort::class.java)
    }

    private val service = client.init()

    fun get(taskList: String): Tasks {
        fun withSubtasks(tasks: List<GTask>): List<Task> {
            val tasksOfParent = tasks.groupBy { it.parent }
            return tasksOfParent[null]
                .orEmpty()
                .map {
                    val subtasks = tasksOfParent[it.id].orEmpty().map { it.toTask() }
                    it.toTask(subtasks)
                }
        }

        val allTasks =
            service.tasks()
                .list(taskList)
                .setShowCompleted(true)
                .setShowHidden(true)
                .execute()
                .items
                .orEmpty()
                .filterNotNull()
        val (todoTasks, doneTasks) = allTasks.partition { it.completed == null }
        return Tasks(
            todo = withSubtasks(todoTasks).sortedBy { it.position },
            done = withSubtasks(doneTasks).sortedByDescending { it.doneAt }
        )
    }

    fun add(taskList: String, request: TaskRequest): Task {
        return service.tasks()
            .insert(taskList, request.toGTask())
            .execute()
            .toTask()
    }

    fun edit(taskList: String, task: String, request: TaskRequest): Task {
        return service.tasks()
            .patch(taskList, task, request.toGTask())
            .execute()
            .toTask()
    }

    fun delete(taskList: String, task: String) {
        service.tasks()
            .delete(taskList, task)
            .execute()
    }


    private fun GTask.toTask(): Task {
        return toTask(emptyList())
    }

    private fun GTask.toTask(subtasks: List<Task>): Task {
        return Task(
            id = id,
            title = title,
            position = position.orEmpty(),
            description = notes,
            doneAt = completed.toInstant(),
            dueBy = due.toInstant(),
            subtasks = subtasks
        )
    }

    private fun String?.toInstant(): Instant? {
        return this?.let { DateTimeFormatter.ISO_OFFSET_DATE_TIME.parse(it, Instant::from) }
    }

    private fun TaskRequest.toGTask(): GTask {
        return GTask()
            .setTitle(title)
            .setStatus(done?.let { if (it) "completed" else "needsAction" })
    }

}