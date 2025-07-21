import { supabase } from '@/lib/supabase';
import { DailyAnswerData } from '@/types/chart'
import type { User } from '@/types/auth'

export const useAnswerSubmission = () => {

    const fetchDailyAnswers = async (user: User): Promise<DailyAnswerData[]> => {
        if (!user) return [];
        const { data, error } = await supabase.rpc('get_daily_answer_stats', {
            user_uuid: user.id,
            days_back: 14
        })
        if (error) throw error;
        const formattedData: DailyAnswerData[] = data.map((row: any) => ({
            date: row.date,
            answerCount: row.answer_count,
            correctCount: row.correct_count,
            accuracy: parseFloat(row.accuracy),
            cumulativeAnswerCount: parseFloat(row.cumulative_answer_count)
        }))
        return formattedData;
    }
    return { fetchDailyAnswers };
}