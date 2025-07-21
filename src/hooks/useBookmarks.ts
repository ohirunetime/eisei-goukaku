import { useCallback } from 'react';
import { Bookmark, BookmarkInsert } from '@/types';
import { supabase } from '@/lib/supabase';
import camelcaseKeys from 'camelcase-keys';
import { BookmarkWithQuestion } from '@/types/bookmark';
import { User } from '@/types/auth';
export const useBookmarks = (user: User) => {

    const existBookmark = async (questionId: number): Promise<boolean> => {
        if (!user) return false;

        try {
            const { data, error } = await supabase
                .from('bookmarks')
                .select('id')
                .eq('question_id', questionId)
                .eq('user_id', user.id)
                .maybeSingle();
            return !!data;
        } catch (err) {
            return false;
        }
    }



    // ブックマーク一覧の取得
    const fetchBookmarks = useCallback(async (): Promise<BookmarkWithQuestion[]> => {
        if (!user) return [];

        try {
            const { data, error } = await supabase
                .from('bookmarks')
                .select(`
                    *,questions:question_id (*)
                `)
                .eq('user_id', user.id);

            if (error) throw error;
            const bookmarks: BookmarkWithQuestion[] = camelcaseKeys(data, { deep: true });

            return bookmarks || [];
        } catch (err) {
            return [];
        }
    }, []);

    const addBookmark = async (questionId: number) => {
        if (!user) return;

        try {
            const insertData: BookmarkInsert = {
                user_id: user.id,
                question_id: questionId,
            }
            const { data, error } = await supabase
                .from('bookmarks')
                .insert(insertData)
            if (error) throw error;
            return data
        } catch (err) {
            return [];
        }
    };

    const deleteBookmark = async (questionId: number): Promise<boolean> => {
        if (!questionId) return false;
        const { error } = await supabase.from('bookmarks').delete().eq('question_id', questionId);
        return !error;
    }



    return { existBookmark, fetchBookmarks, addBookmark, deleteBookmark };
};