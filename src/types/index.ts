// supabase.tsから型をimportしてexport（アプリ全体で使う型の窓口）
import {Database} from './supabase';
export type AnswerHistory = Database['public']['Tables']['answer_history']['Row']
export type AnswerInsert = Database['public']['Tables']['answer_history']['Insert']

export type Bookmark = Database['public']['Tables']['bookmarks']['Row']
export type BookmarkInsert = Database['public']['Tables']['bookmarks']['Insert']