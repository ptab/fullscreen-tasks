package me.taborda.fullscreentasks.ports

import me.taborda.fullscreentasks.domain.TaskList

interface Domain {

    fun getTaskLists(): List<TaskList>

}