package nav.no.models

import io.ktor.websocket.*
import java.util.concurrent.atomic.AtomicInteger

class SocketConnection(val session: DefaultWebSocketSession, val pin: Int, val isHost: Boolean) {
    companion object {
        var lastId = AtomicInteger(0)
    }
    val name = "user${lastId.getAndIncrement()}"
}
