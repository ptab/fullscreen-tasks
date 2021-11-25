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
    sourceCompatibility = JavaVersion.VERSION_16
    targetCompatibility = JavaVersion.VERSION_16
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.jetbrains.kotlin", "kotlin-reflect")
    implementation("org.jetbrains.kotlin", "kotlin-stdlib-jdk8")
    implementation("org.springframework.boot", "spring-boot-starter-web")

    implementation("com.google.apis", "google-api-services-tasks", "v1-rev20210709-1.32.1")
    implementation("com.google.api-client", "google-api-client", "1.32.2")
    implementation("com.google.http-client", "google-http-client-jackson2", "1.40.1")
    implementation("com.google.oauth-client", "google-oauth-client-jetty", "1.32.1")

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