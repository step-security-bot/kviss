import { ChangeEvent, useState } from 'react'
import QuestionForm from '~/components/quizAdministration/QuestionForm'
import QuestionsPreview from '~/components/quizAdministration/QuestionsPreview'
import QuizInformationForm from '~/components/quizAdministration/QuizInformationForm'
import { IAlternative, IQuestion, IQuiz } from '~/context/QuizContext'

interface IQuizInfo {
    name: string
    description: string
}

export default function CreateQuiz() {

    const [quizInfo, setQuizInfo] = useState<IQuizInfo>({
        name: '',
        description: ''
    })

    const [questions, setQuestions] = useState<IQuestion[]>([])

    const [quiz, setQuiz] = useState<IQuiz>()

    const onCreateQuiz = () => {
        setQuiz({
            id: 1,
            name: quizInfo.name,
            description: quizInfo.description,
            questions,
            isDraft: false
        })
    }

    /**
     * TODO: Wrap in context for questions, currently a lot of prop drilling
     */
    return (
        <div className='flex flex-col h-screen justify-center items-center'>
            <h2 className='text-2xl mb-2'>Quiz info</h2>
            <QuizInformationForm quizInfo={quizInfo} setQuizInfo={setQuizInfo} />
            <h2 className='text-2xl my-2'>Questions</h2>
            <QuestionsPreview questions={questions} setQuestions={setQuestions}/>
            <button className='flex flex-col border-2 border-black rounded mt-2' onClick={onCreateQuiz}>
                <h1 className='text-2xl my-2'>CREATE QUIZ</h1>
            </button>
        </div>
    )
}