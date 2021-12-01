package me.taborda.fullscreentasks.domain

import java.time.Instant

data class TaskList(
    val id: String,
    val title: String
)

data class Tasks(
    val todo: List<Task>,
    val done: List<Task>
)

data class Task(
    val id: String,
    val title: String,
    val position: String,
    val doneAt: Instant?,
    val details: String?,
    val dueBy: Instant?,
    val parent: String?,
    val subtasks: List<Task>
) {
    val done = doneAt != null
}

data class EditTaskListRequest(
    val title: String?,
)

data class TaskRequest(
    val title: String?,
    val done: Boolean?,
    val details: String?,
    val dueBy: Instant?,
    val parent: String?
)