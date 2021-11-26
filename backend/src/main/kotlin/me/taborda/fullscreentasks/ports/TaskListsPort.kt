package me.taborda.fullscreentasks.ports

import me.taborda.fullscreentasks.domain.TaskList
import me.taborda.fullscreentasks.domain.TaskListRequest

interface TaskListsPort {

    fun get(): List<TaskList>

    fun add(request: TaskListRequest): TaskList

    fun edit(id: String, request: TaskListRequest): TaskList

    fun delete(id: String)

}