package me.taborda.fullscreentasks.ports

import me.taborda.fullscreentasks.domain.Task
import me.taborda.fullscreentasks.domain.TaskList

interface Domain {

    fun getTaskLists(): List<TaskList>

    fun addTask(taskList: String, title: String): Task

}