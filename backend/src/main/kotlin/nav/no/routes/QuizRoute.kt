package nav.no.routes

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import nav.no.models.CreateQuizRequest
import nav.no.models.Question
import nav.no.services.QuizService
import nav.no.database.domain.Quiz as DBQuiz

fun Route.quizRoute(quizService: QuizService) {
    route("quiz") {
        get {
            val quizList = quizService.getQuizzes()
            call.respond(quizList)
        }
        post {
            val source = call.receive<CreateQuizRequest>()
            val id = quizService.createQuiz(source)
            call.respond(id)
        }

        route("{id}") {
            get {
                try {
                    val quiz: DBQuiz = quizService.getQuiz(call.parameters["id"]!!.toLong())
                    call.respond(quiz)
                } catch (e: Exception) {
                    call.respond(HttpStatusCode(404, "Quiz not found"))                }
            }
            get("questions") {
                try {
                    val questions: List<Question> = quizService
                        .getQuestions(call.parameters["id"]!!.toLong())
                    call.respond(questions)
                } catch (e: Exception) {
                    call.respond(HttpStatusCode(404, "error getting questions"))
                }
            }
        }
    }
}