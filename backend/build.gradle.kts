import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    idea
    kotlin("jvm") version "1.6.0"
    kotlin("plugin.spring") version "1.6.0"
    id("org.springframework.boot") version "2.6.0"
    id("io.spring.dependency-management") version "1.0.11.RELEASE"
}

group = "me.taborda"
version = "0.0.1-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.jetbrains.kotlin", "kotlin-reflect")
    implementation("org.jetbrains.kotlin", "kotlin-stdlib-jdk8")

    implementation("org.springframework.boot", "spring-boot-starter-web")
    implementation("org.springframework.boot", "spring-boot-starter-security")
    implementation("org.springframework.boot", "spring-boot-starter-oauth2-client")

    implementation("com.google.apis", "google-api-services-tasks", "v1-rev20210709-1.32.1")

    testImplementation("org.springframework.boot", "spring-boot-starter-test")
}

tasks {

    withType<KotlinCompile> {
        sourceCompatibility = java.sourceCompatibility.toString()
        targetCompatibility = java.targetCompatibility.toString()
        kotlinOptions {
            freeCompilerArgs = listOf("-Xjsr305=strict")
            jvmTarget = java.targetCompatibility.toString()
        }
    }

    withType<Test> {
        useJUnitPlatform()
    }

    register<Copy>("processFrontendResources") {
        group = "Frontend"
        description = "Process frontend resources"
        dependsOn(project(":frontend").tasks.named("assembleFrontend"))

        from(file("${project(":frontend").buildDir}"))
        into(file("${project.buildDir}/resources/main/public"))
    }

    named("processResources") {
        dependsOn(project.tasks.named("processFrontendResources"))
    }
}