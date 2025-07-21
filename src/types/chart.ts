// フロントエンドで使う型（camelCase）
export interface DailyAnswerData {
  date: string
  answerCount: number
  correctCount: number
  accuracy: number
  cumulativeAnswerCount: number
}
export interface SubjectCoverage {
  subjectId: number;
  subjectName: string;
  totalQuestionCount: number;
  answeredQuestionCount: number;
  year:number;
  month:number;
}