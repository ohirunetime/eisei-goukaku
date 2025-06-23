export const ANSWER_STATE = {
  UNANSWERED: 'unanswered',
  CORRECT: 'correct',
  INCORRECT: 'incorrect',
} as const;

// リテラル型のユニオンとして定義
export type AnswerState = typeof ANSWER_STATE[keyof typeof ANSWER_STATE];