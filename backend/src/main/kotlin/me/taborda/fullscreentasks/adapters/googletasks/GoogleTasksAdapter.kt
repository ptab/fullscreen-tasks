package me.taborda.fullscreentasks.adapters.googletasks

import me.taborda.fullscreentasks.domain.Task
import me.taborda.fullscreentasks.domain.TaskList
import me.taborda.fullscreentasks.domain.TaskListRequest
import me.taborda.fullscreentasks.domain.TaskRequest
import me.taborda.fullscreentasks.domain.Tasks
import me.taborda.fullscreentasks.ports.GoogleTasksPort
import org.springframework.stereotype.Component

@Component
class GoogleTasksAdapter(
    private val taskListsClient: TaskListsClient,
    private val tasksClient: TasksClient
) : GoogleTasksPort {

    override fun getTaskLists(): List<TaskList> {
        return taskListsClient.get()
    }

    override fun addTaskList(request: TaskListRequest): TaskList {
        return taskListsClient.add(request)
    }

    override fun editTaskList(taskList: String, request: TaskListRequest): TaskList {
        return taskListsClient.edit(taskList, request)
    }

    override fun deleteTaskList(taskList: String) {
        taskListsClient.delete(taskList)
    }

    override fun getTasks(taskList: String): Tasks {
        return tasksClient.get(taskList)
    }

    override fun addTask(taskList: String, request: TaskRequest): Task {
        return tasksClient.add(taskList, request)
    }

    override fun editTask(taskList: String, task: String, request: TaskRequest): Task {
        return tasksClient.edit(taskList, task, request)
    }

    override fun deleteTask(taskList: String, task: String) {
        tasksClient.delete(taskList, task)
    }

}