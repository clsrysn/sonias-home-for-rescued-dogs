// Test Firebase connection
import { db } from './config';
import { collection, getDocs } from 'firebase/firestore';

const testFirebase = async () => {
  try {
    console.log('Testing Firebase connection...');
    console.log('Firebase config:', {
      projectId: 'share-website-34675',
      hasDb: !!db
    });
    
    const testCollection = collection(db, 'dogs');
    const snapshot = await getDocs(testCollection);
    console.log('Firebase connected! Documents found:', snapshot.size);
    console.log('Sample document:', snapshot.docs[0]?.data());
  } catch (error) {
    console.error('Firebase connection failed:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
  }
};

// Run test
testFirebase();
