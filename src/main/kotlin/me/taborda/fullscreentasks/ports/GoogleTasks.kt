package me.taborda.fullscreentasks.ports

import me.taborda.fullscreentasks.domain.Task
import me.taborda.fullscreentasks.domain.TaskList

interface GoogleTasks {

    fun getTaskLists(): List<TaskList>

    fun getTasks(taskList: String): List<Task>

}