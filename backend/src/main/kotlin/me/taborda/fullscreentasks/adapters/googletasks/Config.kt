package me.taborda.fullscreentasks.adapters.googletasks

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport
import com.google.api.client.http.javanet.NetHttpTransport
import com.google.api.client.json.gson.GsonFactory
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class Config {

    @Bean
    fun jsonFactory(): GsonFactory {
        return GsonFactory.getDefaultInstance()
    }

    @Bean
    fun httpTransport(): NetHttpTransport {
        return GoogleNetHttpTransport.newTrustedTransport()
    }

}