package me.taborda.fullscreentasks.ports

import me.taborda.fullscreentasks.domain.Task
import me.taborda.fullscreentasks.domain.TaskRequest
import me.taborda.fullscreentasks.domain.Tasks

interface TasksPort {

    fun get(taskList: String): Tasks

    fun add(taskList: String, request: TaskRequest): Task

    fun edit(taskList: String, id: String, request: TaskRequest): Task

    fun delete(taskList: String, id: String)

}