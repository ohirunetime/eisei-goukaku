src/
  types/
    supabase.ts      // Supabase自動生成型（スネークケース）
    index.ts         // supabase.tsから型をimportしてexport（アプリ全体で使う型の窓口）
    auth.ts          // 認証関連の型
    questions.ts     // アプリ用キャメルケース型（独自定義）