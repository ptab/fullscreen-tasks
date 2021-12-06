package me.taborda.fullscreentasks

import org.springframework.http.HttpStatus
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.web.servlet.invoke
import org.springframework.security.web.authentication.HttpStatusEntryPoint

@EnableWebSecurity
class SecurityConfig : WebSecurityConfigurerAdapter() {

    override fun configure(http: HttpSecurity?) {
        http {
            authorizeRequests {
                authorize("/", permitAll)
                authorize("/error", permitAll)
                // FIXME replace this with a proper /public or whatever
                authorize("/static/**", permitAll)
                authorize("/favicon.ico", permitAll)
                authorize(anyRequest)
            }

            oauth2Login {
                defaultSuccessUrl("/", true)
            }

            logout {
                logoutUrl = "/api/user/logout"
                logoutSuccessUrl = "/"
            }

            exceptionHandling {
                authenticationEntryPoint = HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)
            }

            // only for dev, remove before going to prod
            cors { disable() }
            csrf { disable() }
        }
    }

}