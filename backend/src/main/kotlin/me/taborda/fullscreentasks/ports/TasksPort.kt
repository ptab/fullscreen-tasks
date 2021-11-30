package me.taborda.fullscreentasks.ports

import me.taborda.fullscreentasks.domain.Task
import me.taborda.fullscreentasks.domain.EditTaskRequest
import me.taborda.fullscreentasks.domain.Tasks

interface TasksPort {

    fun get(taskList: String): Tasks

    fun add(taskList: String, request: EditTaskRequest): Task

    fun edit(taskList: String, id: String, request: EditTaskRequest): Task

    fun delete(taskList: String, id: String)

}