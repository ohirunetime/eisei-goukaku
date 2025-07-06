import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as fs from 'fs';

const serviceAccount = JSON.parse(
    fs.readFileSync(process.env.GATSBY_FIREBASE_ADMIN_KEY_PATH!, 'utf8')
);

initializeApp({
    credential: cert(serviceAccount),
    projectId: process.env.GATSBY_FIREBASE_PROJECT,
});

export const db = getFirestore();
