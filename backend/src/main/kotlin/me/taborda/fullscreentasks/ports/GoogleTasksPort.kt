package me.taborda.fullscreentasks.ports

import me.taborda.fullscreentasks.domain.Task
import me.taborda.fullscreentasks.domain.TaskList
import me.taborda.fullscreentasks.domain.TaskListRequest
import me.taborda.fullscreentasks.domain.TaskRequest
import me.taborda.fullscreentasks.domain.Tasks

interface GoogleTasksPort {

    fun getTaskLists(): List<TaskList>

    fun addTaskList(request: TaskListRequest): TaskList

    fun editTaskList(taskList: String, request: TaskListRequest): TaskList

    fun deleteTaskList(taskList: String)

    fun getTasks(taskList: String): Tasks

    fun addTask(taskList: String, request: TaskRequest): Task

    fun editTask(taskList: String, task: String, request: TaskRequest): Task

    fun deleteTask(taskList: String, task: String)

}