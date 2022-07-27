package nav.no.plugins

import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.plugins.cors.routing.*
import io.ktor.server.routing.*
import nav.no.ApplicationContext
import nav.no.database.dao.*
import nav.no.routes.*

fun Application.configureRouting(context: ApplicationContext) {
    install(ContentNegotiation) { json() }
    install(IgnoreTrailingSlash)
    install(CORS) {
        anyHost()
        allowHeader(HttpHeaders.ContentType)
    }

    routing {
        healthAPI()
        helloWorldRoute()
        quizRoute(context.quizService)
        playerRoute(context.gameService)
        gameRoute(context.gameService)
    }
}
