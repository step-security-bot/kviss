import { createContext, FC, useContext, useReducer } from 'react'
import { ActionTypes, GameAction, Game, StegProps } from './game'

const initialState: Game = {}

const reducer = (state: Game, action: GameAction) => {
    const { type, payload } = action
    switch (type) {
    case ActionTypes.SET_PINCODE: {
        return { ...state, pin: payload }
    }
    case ActionTypes.SET_USERNAME: {
        return { ...state, username: payload }
    }
    case ActionTypes.SEND_QUESTION_EVENT: {
        return { ...state, currentQuestion: payload }
    }
    default:
        return { ...state }
    }
}

const GameContext = createContext<StegProps>({
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
