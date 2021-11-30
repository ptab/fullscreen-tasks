package me.taborda.fullscreentasks.ports

import me.taborda.fullscreentasks.domain.TaskList
import me.taborda.fullscreentasks.domain.EditTaskListRequest

interface TaskListsPort {

    fun get(): List<TaskList>

    fun add(request: EditTaskListRequest): TaskList

    fun edit(id: String, request: EditTaskListRequest): TaskList

    fun delete(id: String)

}