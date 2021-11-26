package me.taborda.fullscreentasks.domain

import me.taborda.fullscreentasks.ports.GoogleTasksPort
import me.taborda.fullscreentasks.ports.TaskListsPort
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service

@Service
class TaskListsService(private val googleTasks: GoogleTasksPort) : TaskListsPort {

    companion object {
        val logger: Logger = LoggerFactory.getLogger(TaskListsService::class.java)
    }

    override fun get(): List<TaskList> {
        return googleTasks.getTaskLists()
    }

    override fun add(request: TaskListRequest): TaskList {
        logger.info("Adding list: $request")
        return googleTasks.addTaskList(request)
    }

    override fun edit(id: String, request: TaskListRequest): TaskList {
        logger.info("Editing list $id: $request")
        return googleTasks.editTaskList(id, request)
    }

    override fun delete(id: String) {
        logger.info("Deleting list $id")
        return googleTasks.deleteTaskList(id)
    }

}