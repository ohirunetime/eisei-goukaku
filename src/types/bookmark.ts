import { Question } from "./question"; // questionsテーブルの型をインポート

/**
 * Supabaseのbookmarksテーブル＋JOINしたquestionsデータ用型
 */
export interface BookmarkWithQuestion {
  id: number;
  questionId: number;
  createdAt: string;
  userId: string;
  questions: Question; // JOINしたquestionsデータ
}