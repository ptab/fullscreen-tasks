package me.taborda.fullscreentasks.adapters.googletasks

import com.google.api.client.auth.oauth2.BearerToken
import com.google.api.client.auth.oauth2.Credential
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport
import com.google.api.client.json.gson.GsonFactory
import com.google.api.services.tasks.Tasks
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Scope
import org.springframework.context.annotation.ScopedProxyMode
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken
import org.springframework.web.context.WebApplicationContext

@Configuration
class GoogleAuthConfig {

    @Bean
    @Scope(WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.TARGET_CLASS)
    fun client(clientService: OAuth2AuthorizedClientService): Tasks {
        val httpTransport = GoogleNetHttpTransport.newTrustedTransport()
        val jsonFactory = GsonFactory.getDefaultInstance()

        val authentication = SecurityContextHolder.getContext().authentication as OAuth2AuthenticationToken
        val client: OAuth2AuthorizedClient = clientService.loadAuthorizedClient(authentication.authorizedClientRegistrationId, authentication.name)

        val credential = Credential.Builder(BearerToken.authorizationHeaderAccessMethod())
            .setTransport(httpTransport)
            .setJsonFactory(jsonFactory)
            .build()

        credential.accessToken = client.accessToken.tokenValue
        client.refreshToken?.let { credential.refreshToken = it.tokenValue }

        return Tasks.Builder(httpTransport, jsonFactory, credential)
            .setApplicationName("Fullscreen Tasks")
            .build()
    }

}