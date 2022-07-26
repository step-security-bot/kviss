import { createContext, FC, useContext, useReducer } from 'react'
import { ActionTypes, GameAction, Game, GameProps } from './game'

const initialState: Game = {}

const reducer = (state: Game, action: GameAction) => {
    const { type, payload } = action
    switch (type) {
    case ActionTypes.SET_PINCODE: {
        return { ...state, pin: payload }
    }
    case ActionTypes.SET_PLAYER: {
        return { ...state, player: payload}
    }
    case ActionTypes.SEND_QUESTION_EVENT: {
        return { ...state, currentQuestion: payload }
    }
    case ActionTypes.PLAYER_JOINED_EVENT: {
        return { ...state, players: [...(state.players || []), payload] }
    }
    case ActionTypes.SET_HOST_ID: {
        return { ...state, hostId: payload }
    }
    default:
        return { ...state }
    }
}

const GameContext = createContext<GameProps>({
    state: initialState,
    dispatch: () => {
        /* Do nothing */
    },
})

const useGameContext = () => useContext(GameContext)

const GameProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>
}

export { useGameContext, GameProvider }
