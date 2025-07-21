/**
 * Supabaseのquestionsテーブル（スネークケース）を
 * アプリケーション用にキャメルケースで定義した型
 */
export interface Question {
  questionId: number;
  year: number;
  month: number;
  examType: number;
  summary: string | null;
  questionText: string;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
  choice5: string;
  correctChoice: number;
  explanation1: string;
  explanation2: string;
  explanation3: string;
  explanation4: string;
  explanation5: string;
  totalExplanation: string | null;
  createdAt: string;
  index: number;
}


export interface QuestionWithSubject extends Question {
  subjects: {
    id: number
    subject: string;
  };
}