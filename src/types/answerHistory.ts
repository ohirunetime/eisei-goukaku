export interface AnswerHistory {
    id: number;
    questionId: number;
    userId: string;
    isCorrect: boolean;
    choiceNumber: number | null;
    createdAt: string;
    answeredAt: string;
}
export interface AnswerHistoryWithQuestion extends AnswerHistory {
    questions: {
        year: number
        month: number;
    };
}