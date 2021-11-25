plugins {
    idea
    id("org.siouan.frontend-jdk11") version "6.0.0"
}

repositories {
    gradlePluginPortal()
}

frontend {
    nodeVersion.set("16.13.0")
    assembleScript.set("run build")
    cleanScript.set("run clean")
}