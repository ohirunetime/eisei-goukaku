import { doc, getDoc, setDoc, deleteDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase"
import { FirestoreTypes } from "@/types/firebase";
import { COLLECTION_NAMES } from "@/constants/firestore";


export const saveQuestionForLater = async (userId: string, questionId: string,questionText:string) => {
    const ref = doc(db, COLLECTION_NAMES.saveQuestions, `${userId}_${questionId}`);

    const data: FirestoreTypes.SavedQuestion = {
        userId: userId,
        questionId: questionId,
        questionText:questionText,
        savedAt: new Date(),
    }
    await setDoc(ref, data)
}

export const isQuestionSaved = async (userId: string, questionId: string) => {
    const ref = doc(db, COLLECTION_NAMES.saveQuestions, `${userId}_${questionId}`);
    const snap = await getDoc(ref);
    return snap.exists();
}
export const removeQuestionSaved = async (userId: string, questionId: string) => {
    const ref = doc(db, COLLECTION_NAMES.saveQuestions, `${userId}_${questionId}`);
    await deleteDoc(ref);
}

export const getSavedQuestions = async (userId: string) => {
    const savedQuestionsQuery = query(
        collection(db, COLLECTION_NAMES.saveQuestions),
        where("userId", "==", userId)
    );
    const savedQuestionsSnapshot = await getDocs(savedQuestionsQuery);

    return savedQuestionsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));
};
