import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AnswerView from '../../components/AnswerView'
import FinalScoreboard from '../../components/FinalScoreboard'
import { Question } from '../../components/Question'
import Scoreboard from '../../components/Scoreboard'
import WaitingView from '../../components/WaitingView'
import { ActionTypes } from '../../context/game/game'
import { useGameContext } from '../../context/game/GameContext'
import logo from "../../public.svg"

export default function QuizView() {

    const { state } = useGameContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (state.pin === undefined) {
            navigate('/join')
        }
    }, [])

    return (
        <div className="justify-center h-full q-full items-center flex">

            { state.currentQuestion && state.currentQuestion.sortOrder === state.currentQuiz?.questions!.length && state.lastEvent == ActionTypes.FINISH_QUESTION_EVENT ?
                <FinalScoreboard/>
                :
                <>
                    {state.lastEvent === undefined && state.hostId === undefined && 
                        <>
                            <div className="text-white text-xl font-mono text-center"> {state.player?.name} joined the game! <br/> <br/> Do you see your name on the screen?</div>
                            <div className="flex flex-col absolute bottom-7">
                                <span className="animate-bounce">
                                    <img src='/Rød.svg' className="h-40"/>
                                </span>
                            </div>
                        </>
                        }
                    {state.lastEvent === ActionTypes.SEND_QUESTION_EVENT && <Question />}
                    {state.lastEvent === ActionTypes.SHOW_ANSWERS_EVENT && <AnswerView />}
                    {state.lastEvent === ActionTypes.HAS_ANSWERED_EVENT && <WaitingView/>}
                    {state.lastEvent === ActionTypes.FINISH_QUESTION_EVENT && <Scoreboard/>}
                </>
            }


        </div>
    )
}