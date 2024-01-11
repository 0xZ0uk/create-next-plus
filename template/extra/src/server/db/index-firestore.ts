import firebase from "@/lib/firebase";

const firestore = firebase.firestore();

export const db = {
	// Define your Firestore interactions here, such as functions to get, set, update, delete documents
	getDocument: async (collectionName: string, docId: string) => {
		const docRef = firestore.collection(collectionName).doc(docId);
		const doc = await docRef.get();
		return doc.exists ? doc.data() : null;
	},
	// ... other database operations
};
