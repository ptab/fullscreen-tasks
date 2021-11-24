package me.taborda.fullscreentasks.adapters.google

import com.google.api.client.auth.oauth2.Credential
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport
import com.google.api.client.http.javanet.NetHttpTransport
import com.google.api.client.json.gson.GsonFactory
import com.google.api.client.util.store.FileDataStoreFactory
import com.google.api.services.tasks.Tasks
import com.google.api.services.tasks.TasksScopes
import me.taborda.fullscreentasks.domain.Task
import me.taborda.fullscreentasks.domain.TaskList
import me.taborda.fullscreentasks.ports.GoogleTasks
import org.springframework.stereotype.Component
import java.io.File
import java.io.FileNotFoundException
import java.io.IOException
import java.io.InputStreamReader
import java.time.Instant
import java.time.format.DateTimeFormatter

import com.google.api.services.tasks.model.Task as GoogleTask

@Component
class GoogleTasksAdapter: GoogleTasks {

    private val scopes = listOf(TasksScopes.TASKS)
    private val credentialsFilePath = "/credentials.json"
    private val tokensDirectoryPath = "tokens"
    private val applicationName = "Fullscreen Tasks"
    private val jsonFactory = GsonFactory.getDefaultInstance()

    private val service = setup()

    override fun getTaskLists(): List<TaskList> {
        return service
            .tasklists()
            .list()
            .execute()
            .items
            .orEmpty()
            .filterNotNull()
            .map { taskList ->
                TaskList(
                    id = taskList.id,
                    title = taskList.title,
                    tasks = getTasks(taskList.id)
                )
            }
    }

    override fun getTasks(taskList: String): List<Task> {
        val groupedTasks =
            service.tasks()
                .list(taskList)
                .setShowCompleted(true)
                .setShowHidden(true)
                .execute()
                .items
                .orEmpty()
                .filterNotNull()
                .groupBy { it.parent }

        return groupedTasks[null]
            .orEmpty()
            .map {
                it.toTask(groupedTasks[it.id].orEmpty().map { subtask -> subtask.toTask() })
            }
    }

    private fun String?.toInstant(): Instant? {
        return this?.let { DateTimeFormatter.ISO_OFFSET_DATE_TIME.parse(it, Instant::from) }
    }

    private fun GoogleTask.toTask(): Task {
        return toTask(emptyList())
    }

    private fun GoogleTask.toTask(subtasks: List<Task>): Task {
        return Task(
            id = id,
            title = title,
            description = notes,
            doneAt = completed.toInstant(),
            dueBy = due.toInstant(),
            subtasks = subtasks
        )
    }

    private fun setup(): Tasks {
        val httpTransport = GoogleNetHttpTransport.newTrustedTransport()
        val credentials = getCredentials(httpTransport)
        return Tasks.Builder(httpTransport, jsonFactory, credentials)
            .setApplicationName(applicationName)
            .build()
    }

    @Throws(IOException::class)
    private fun getCredentials(httpTransport: NetHttpTransport): Credential? {
        // Load client secrets.
        val `in` = GoogleTasksAdapter::class.java.getResourceAsStream(credentialsFilePath) ?: throw FileNotFoundException("Resource not found: $credentialsFilePath")
        val clientSecrets = GoogleClientSecrets.load(jsonFactory, InputStreamReader(`in`))

        // Build flow and trigger user authorization request.
        val flow = GoogleAuthorizationCodeFlow.Builder(httpTransport, jsonFactory, clientSecrets, scopes)
            .setDataStoreFactory(FileDataStoreFactory(File(tokensDirectoryPath)))
            .setAccessType("offline")
            .build()
        val receiver = LocalServerReceiver.Builder().setPort(8888).build()
        return AuthorizationCodeInstalledApp(flow, receiver).authorize("user")
    }

}