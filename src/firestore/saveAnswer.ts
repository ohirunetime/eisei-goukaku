import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/firebase"
import { FirestoreTypes } from "@/types/firebase";

export const saveAnswer = async (userId: string, questionId: string, isCorrect: boolean, choiceNumber: number | null) => {

    const data: FirestoreTypes.UserAnswer = {
        id: `${userId}_${questionId}`,
        userId: userId,
        questionId: questionId,
        isCorrect: isCorrect,
        choiceNumber: choiceNumber,
        answeredAt: new Date()
    }
    await addDoc(collection(db, "answers"), data)
}