package me.taborda.fullscreentasks.domain

import java.time.Instant


data class TaskList(
    val id: String,
    val title: String,
    val tasks: List<Task>
)

data class Task(
    val id: String,
    val title: String,
    val description: String?,
    val doneAt: Instant?,
    val dueBy: Instant?,
    val subtasks: List<Task>
) {

    val done = doneAt != null

}