package me.taborda.fullscreentasks.adapters.api

import me.taborda.fullscreentasks.domain.Task
import me.taborda.fullscreentasks.domain.EditTaskRequest
import me.taborda.fullscreentasks.domain.Tasks
import me.taborda.fullscreentasks.ports.TasksPort
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/lists/{taskList}/tasks")
class TasksController(private val tasks: TasksPort) {

    @GetMapping
    fun get(@PathVariable taskList: String): Tasks {
        return tasks.get(taskList)
    }

    @PostMapping
    fun add(@PathVariable taskList: String, @RequestBody request: EditTaskRequest): Task {
        return tasks.add(taskList, request)
    }

    @PatchMapping("/{task}")
    fun edit(@PathVariable taskList: String, @PathVariable("task") id: String, @RequestBody request: EditTaskRequest): Task {
        return tasks.edit(taskList, id, request)
    }

    @DeleteMapping("/{task}")
    fun delete(@PathVariable taskList: String, @PathVariable("task") id: String) {
        tasks.delete(taskList, id)
    }

}
