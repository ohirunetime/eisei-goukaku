export namespace FirestoreTypes {
  export interface SavedQuestion {
    userId: string;
    questionId: string;
    questionText: string;
    savedAt: Date;
  }

  export interface UserAnswer {
    id: string;
    userId: string;
    questionId: string;
    isCorrect: boolean;
    choiceNumber: number | null;
    answeredAt: Date;
  }

}
