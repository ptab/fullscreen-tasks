package me.taborda.fullscreentasks.adapters.googletasks

import com.google.api.client.auth.oauth2.Credential
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets
import com.google.api.client.http.javanet.NetHttpTransport
import com.google.api.client.json.gson.GsonFactory
import com.google.api.client.util.store.FileDataStoreFactory
import com.google.api.services.tasks.Tasks
import com.google.api.services.tasks.TasksScopes
import org.springframework.stereotype.Component
import java.io.File
import java.io.FileNotFoundException
import java.io.IOException
import java.io.InputStreamReader

@Component
class GoogleTasksClient(
    private val jsonFactory: GsonFactory,
    private val httpTransport: NetHttpTransport
) {

    companion object {
        private const val credentialsFilePath = "/credentials.json"
        private const val tokensDirectoryPath = "tokens"
        private const val applicationName = "Fullscreen Tasks"
        private val scopes = listOf(TasksScopes.TASKS)
    }

    fun init(): Tasks {
        val credentials = getCredentials(httpTransport)
        return Tasks.Builder(httpTransport, jsonFactory, credentials)
            .setApplicationName(applicationName)
            .build()
    }

    @Throws(IOException::class)
    private fun getCredentials(httpTransport: NetHttpTransport): Credential? {
        // Load client secrets.
        val `in` = TaskListsClient::class.java.getResourceAsStream(credentialsFilePath) ?: throw FileNotFoundException("Resource not found: $credentialsFilePath")
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