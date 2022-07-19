import { ChangeEvent, useState } from 'react'
import QuizInformationForm from '~/components/quizAdministration/QuizInformationForm'
import { IAlternative, IQuestion, IQuiz } from '~/context/QuizContext'

interface IQuizInfo {
    name: string
    description: string
}

export default function CreateQuiz() {

    const [tempAlternativesArray, setTempAlternativesArray] = useState<IAlternative[]>([
        { id: 1, text: '', isCorrect: false },
        { id: 1, text: '', isCorrect: false },
        { id: 1, text: '', isCorrect: false },
        { id: 1, text: '', isCorrect: false }
    ])

    const [quizInfo, setQuizInfo] = useState<IQuizInfo>({
        name: '',
        description: ''
    })

    const [questionDescription, setQuestionDescription] = useState<string>('')

    const [questions, setQuestions] = useState<IQuestion[]>([])

    const [quiz, setQuiz] = useState<IQuiz>()

    const handleQuestionDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuestionDescription(event.target.value)
    }

    const replaceAlternativeTextAtIndex = (index: number, newAlternativeText: string) => {
        const alternatives = [...tempAlternativesArray]
        alternatives[index] = { id: alternatives[index].id, text: newAlternativeText, isCorrect: alternatives[index].isCorrect }
        setTempAlternativesArray(alternatives)
    }

    const replaceAlternativeIsCorrectAtIndex = (index: number, newAlternativeIsCorrect: boolean) => {
        const alternatives = [...tempAlternativesArray]
        alternatives[index] = { id: alternatives[index].id, text: alternatives[index].text, isCorrect: newAlternativeIsCorrect }
        setTempAlternativesArray(alternatives)
    }

    const onAddQuestion = () => {
        setQuestions(questions.concat({
            quizId: 1,
            id: questions.length,
            description: questionDescription,
            alternative: tempAlternativesArray,
            sortOrder: 1
        }))
    }

    const onCreateQuiz = () => {
        setQuiz({
            id: 1,
            name: quizInfo.name,
            description: quizInfo.description,
            questions,
            isDraft: false
        })
    }

    return (
        <div className='flex items-center h-screen flex-col'>
            <h2 className='text-2xl mb-2'>Quiz info</h2>
            <QuizInformationForm quizInfo={quizInfo} setQuizInfo={setQuizInfo} />
            <h2 className='text-2xl my-2'>Questions</h2>
            <div>
                {questions.map((item, i) => {
                    return (
                        <div key={i} className='flex flex-col my-2'>
                            <p>Question: {item.description}</p>
                            {item.alternative.map((alt, j) => {
                                return <p key={j}>{`Alternative ${j + 1}: ${alt.text}. Correct?: ${alt.isCorrect}`}</p>
                            })}
                        </div>
                    )
                })}
            </div>
            <form className='flex flex-col'>
                <label className='mb-1'>
                    Description:
                    <input type="text" onChange={handleQuestionDescriptionChange} />
                </label>
                {tempAlternativesArray.map((item, i) => {
                    return (
                        <div key={i} className="my-1">
                            <label>
                                {`Alternative ${i + 1}:`}
                                <input type="text" onChange={e => replaceAlternativeTextAtIndex(i, e.target.value)} />
                            </label>
                            <label className='ml-2'>
                                Correct?:
                                <input type="checkbox" onChange={e => replaceAlternativeIsCorrectAtIndex(i, e.target.checked)} />
                            </label>
                        </div>
                    )
                })}
            </form>
            <button className='border-2 border-black rounded mt-2' onClick={onAddQuestion}>Add question</button>
            <button className='flex flex-col border-2 border-black rounded mt-2' onClick={onCreateQuiz}>
                <h1 className='text-2xl my-2'>CREATE QUIZ</h1>
            </button>
        </div>
    )
}