import { supabase } from '@/lib/supabase';
import { SubjectCoverage } from '@/types/chart'
import type { User } from '@/types/auth'

export const useSubjectCoverage = () => {

    const fetchSubjectCoverage = async (user: User): Promise<SubjectCoverage[]> => {
        if (!user) return [];
        const { data, error } = await supabase.rpc('get_subject_coverage_by_year_month', {
            user_uuid: user.id,
        })
        if (error) throw error;
        const formattedData: SubjectCoverage[] = data.map((row: any) => ({
            subjectId: row.subject_id,
            subjectName: row.subject_name,
            totalQuestionCount: row.total_question_count,
            correctCount: row.correct_count,
            answeredQuestionCount: row.answered_question_count,
            year: row.year,
            month: row.month
        }))
        return formattedData;
    }
    return { fetchSubjectCoverage };
}