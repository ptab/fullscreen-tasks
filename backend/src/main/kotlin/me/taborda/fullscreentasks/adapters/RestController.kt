package me.taborda.fullscreentasks.adapters

import me.taborda.fullscreentasks.domain.Task
import me.taborda.fullscreentasks.domain.TaskList
import me.taborda.fullscreentasks.ports.Domain
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class RestController(private val domain: Domain) {

    @GetMapping("/lists")
    fun lists(): List<TaskList> {
        return domain.getTaskLists()
    }

    @PostMapping("/lists/{taskList}")
    fun addTask(@PathVariable("taskList") taskList: String, @RequestBody title: String): Task {
        return domain.addTask(taskList, title)
    }

}