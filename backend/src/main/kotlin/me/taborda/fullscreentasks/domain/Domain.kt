package me.taborda.fullscreentasks.domain

import me.taborda.fullscreentasks.ports.Domain
import me.taborda.fullscreentasks.ports.GoogleTasks
import org.springframework.stereotype.Service

@Service
class DomainService(private val googleTasks: GoogleTasks) : Domain {

    override fun getTaskLists(): List<TaskList> {
        return googleTasks.getTaskLists()
    }

    override fun addTask(taskList: String, title: String): Task {
        return googleTasks.addTask(taskList, title)
    }
}