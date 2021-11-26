package me.taborda.fullscreentasks.adapters.api

import me.taborda.fullscreentasks.domain.TaskList
import me.taborda.fullscreentasks.domain.TaskListRequest
import me.taborda.fullscreentasks.ports.TaskListsPort
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/lists")
class TaskListsController(private val taskLists: TaskListsPort) {

    @GetMapping
    fun get(): List<TaskList> {
        return taskLists.get()
    }

    @PostMapping
    fun add(@RequestBody request: TaskListRequest): TaskList {
        return taskLists.add(request)
    }

    @PatchMapping("/{taskList}")
    fun edit(@PathVariable("taskList") id: String, @RequestBody request: TaskListRequest): TaskList {
        return taskLists.edit(id, request)
    }

    @DeleteMapping("/{taskList}")
    fun delete(@PathVariable("taskList") id: String) {
        taskLists.delete(id)
    }

}
