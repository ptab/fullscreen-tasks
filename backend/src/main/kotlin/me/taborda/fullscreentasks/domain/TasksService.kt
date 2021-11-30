package me.taborda.fullscreentasks.domain

import me.taborda.fullscreentasks.ports.GoogleTasksPort
import me.taborda.fullscreentasks.ports.TasksPort
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service

@Service
class TasksService(private val googleTasks: GoogleTasksPort) : TasksPort {

    companion object {
        val logger: Logger = LoggerFactory.getLogger(TasksService::class.java)
    }

    override fun get(taskList: String): Tasks {
        return googleTasks.getTasks(taskList)
    }

    override fun add(taskList: String, request: EditTaskRequest): Task {
        logger.info("Adding task to list $taskList: $request")
        return googleTasks.addTask(taskList, request)
    }

    override fun edit(taskList: String, id: String, request: EditTaskRequest): Task {
        logger.info("Editing task $id on list $taskList: $request")
        return googleTasks.editTask(taskList, id, request)
    }

    override fun delete(taskList: String, id: String) {
        logger.info("Deleting task $id on list $taskList")
        return googleTasks.deleteTask(taskList, id)
    }

}