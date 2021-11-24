package me.taborda.fullscreentasks.adapters.rest

import me.taborda.fullscreentasks.domain.TaskList
import me.taborda.fullscreentasks.ports.Domain
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class RestController(private val domain: Domain) {

    @GetMapping("/tasklists")
    fun taskLists(): List<TaskList> {
        return domain.getTaskLists()
    }

}