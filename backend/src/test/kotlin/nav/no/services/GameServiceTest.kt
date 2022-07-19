package nav.no.services

import io.mockk.*
import nav.no.database.navhootDao.AlternativesDao
import nav.no.database.navhootDao.GameDao
import nav.no.database.navhootDao.PlayerDao
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import kotlin.test.assertNotNull

internal class GameServiceTest {

    private val alternativesDao = mockk<AlternativesDao>()
    private val playerDao = mockk<PlayerDao>()
    private val gamedao = mockk<GameDao>()

    private val service = GameService(alternativesDao, playerDao, gamedao)

    @AfterEach
    fun afterEach(){
        confirmVerified(gamedao)
        clearAllMocks()
    }

    @Test
    fun `No result in database`() {
        every { gamedao.checkGamePin(any()) } returns null

        service.createGamePin()

        verify(exactly = 1) { gamedao.checkGamePin(any()) }
    }

    @Test
    fun `exception after three tries`() {
        every { gamedao.checkGamePin(any()) }
            .returns(1)
            .andThen(2)
            .andThen(3)

        try {
            service.createGamePin()
            Assertions.fail()
        } catch (e: Exception) {
            assertNotNull(e)
        }

        verify(exactly = 3) { gamedao.checkGamePin(any()) }
    }

    @Test
    fun `match on first`() {
        every { gamedao.checkGamePin(any()) }
            .returns(1234)
            .andThen(null)

        service.createGamePin()


        verify(exactly = 2) { gamedao.checkGamePin(any()) }
    }

}