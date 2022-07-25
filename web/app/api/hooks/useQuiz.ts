import useSWR from 'swr'
import { IQuiz } from '~/context/QuizContext'
import { fetcher, poster } from '../operations'

export const useQuizById = (id: number) => {
    const { data, error } = useSWR<IQuiz, Error>(`/quiz/${id}`, fetcher)

    return {
        quiz: data,
        loading: !error && !data,
        error,
    }
}

export const useCreateQuiz = async (quiz: IQuiz) => {
    const { data, error } = await poster<number>('http://localhost:8080/quiz', quiz)

    return {
        response: data,
        error,
    }
}
