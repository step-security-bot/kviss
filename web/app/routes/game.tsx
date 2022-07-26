import {Outlet} from '@remix-run/react'
import {useEffect, useState} from 'react'
import {ActionTypes, IQuestion} from '~/context/game/game'
import {useGameContext} from '~/context/game/GameContext'
import SocketContextProvider from '~/context/SocketContext'


export default function GameView() {
    const [socket, setSocket] = useState<WebSocket>()
    const { state, dispatch } = useGameContext()

    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:8080/game/${state.pin}`)

        setSocket(ws)
        return () => {
            console.log('ws.close()')
            ws.close()
        }
    }, [])

    useEffect(() => {
        if (!socket) return
        socket.onopen = (event) => {
            console.log(event)
        }
        socket.onmessage = (event) => {
            console.log(event.data)

            const type: string = JSON.parse(event.data).type

            switch (type) {
            case ActionTypes.SEND_QUESTION_EVENT: {
                dispatch({
                    type: ActionTypes.SEND_QUESTION_EVENT,
                    payload: JSON.parse(event.data).question as IQuestion
                })
                break
            }
            case ActionTypes.SET_PINCODE: {
                dispatch({type: ActionTypes.SET_PINCODE, payload: event.data.playerName})
                break
            }
            case ActionTypes.PLAYER_JOINED_EVENT: {
                dispatch({
                    type: ActionTypes.PLAYER_JOINED_EVENT,
                    payload: JSON.parse(event.data).playerName as string
                })
            }
            }
        }

    }, [socket])

    return (
        <SocketContextProvider socket={socket}>
            <Outlet />
        </SocketContextProvider>
    )
}



