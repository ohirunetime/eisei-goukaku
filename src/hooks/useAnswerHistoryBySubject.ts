import { supabase } from '@/lib/supabase';
import type { AnswerHistoryWithQuestion } from '@/types/answerHistory';
import camelcaseKeys from 'camelcase-keys';
import { User } from '@/types/auth';


export const useAnswerHistoryBySubject = (user: User) => {
    /**
     * 指定ユーザー・年度の回答履歴を取得（questionsテーブルとJOIN）
     */
    const fetchAnswerHistoryBySubject = async (
        subjectId: number,
    ): Promise<AnswerHistoryWithQuestion[]> => {
        if (!user) {
            return [];
        }
        const { data, error } = await supabase
            .from('answer_history')
            .select(`
        *,
        questions:question_id (
          year,
          month
        )
      `)
            .eq('user_id', user.id)
            .eq('questions.subject', subjectId)

        if (error) throw error;
        const formatted: AnswerHistoryWithQuestion[] = camelcaseKeys(data, { deep: true });

        return formatted;
    };
    return { fetchAnswerHistoryBySubject };
}