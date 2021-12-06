package me.taborda.fullscreentasks.adapters.api

import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/user")
class UserController {

    @GetMapping
    fun get(@AuthenticationPrincipal user: OAuth2User): User {
        return User(
            name = user.name,
            picture = user.getAttribute<String>("picture")
        )
    }

}

data class User(
    val name: String,
    val picture: String?,
)