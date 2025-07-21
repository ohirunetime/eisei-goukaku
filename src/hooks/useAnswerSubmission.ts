import { supabase } from '@/lib/supabase';
import { AnswerInsert } from '../types/index';
import { useAuthContext } from '@/contexts/AuthContext';

export const useAnswerSubmission = () => {
  const { user } = useAuthContext();

  /**
   * 回答履歴を登録する
   * @returns 登録成功: true, 失敗: false
   */
  const submitAnswer = async (
    questionId: number,
    isCorrect: boolean,
    choiceNumber: number
  ): Promise<boolean> => {
    if (!user) {
      throw new Error('ユーザーが認証されていません');
    }

    const insertData: AnswerInsert = {
      user_id: user.id,
      question_id: questionId,
      is_correct: isCorrect,
      choice_number: choiceNumber,
    };

    const { error } = await supabase
      .from('answer_history')
      .insert(insertData);

    if (error) {
      console.error('回答履歴の登録に失敗:', error.message);
      return false;
    }
    return true;
  };

  return { submitAnswer };
};