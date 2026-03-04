# Firebase Database Setup Guide

## Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select existing project
3. Enter project name (e.g., "sonias-dog-rescue")
4. Enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Set Up Firestore Database
1. In Firebase Console, go to "Build" → "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location (choose closest to your users)
5. Click "Create"

## Step 3: Get Firebase Configuration
1. In Firebase Console, go to Project Settings (⚙️ icon)
2. Scroll down to "Your apps" section
3. Click Web app icon (`</>`)
4. Give your app a nickname
5. Click "Register app"
6. Copy the `firebaseConfig` object

## Step 4: Update Firebase Config
1. Open `src/firebase/config.ts`
2. Replace the placeholder config with your actual Firebase config:
```typescript
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

## Step 5: Set Up Database Collections
### Dogs Collection Structure
```javascript
// Collection: dogs
// Document ID: auto-generated
{
  name: "Buddy",
  age: "2 years",
  description: "Friendly and energetic dog looking for a home",
  image: "https://example.com/buddy.jpg",
  adopted: false,
  category: "Puppies",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Donations Collection Structure
```javascript
// Collection: donations
// Document ID: auto-generated
{
  name: "John Doe",
  email: "john@example.com",
  amount: 50,
  type: "one-time", // or "monthly", "sponsor"
  dogId: "dog-document-id", // optional
  message: "Happy to help!", // optional
  createdAt: timestamp
}
```

## Step 6: Add Sample Data (Optional)
You can add sample data through Firebase Console:
1. Go to Firestore Database
2. Click "Start collection"
3. Collection name: `dogs`
4. Add documents with the structure above

## Step 7: Security Rules (For Production)
Update Firestore rules in Firebase Console → Firestore Database → Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Dogs collection - read access for all, write access for authenticated users
    match /dogs/{dogId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Donations collection - write access for all, read access for authenticated users
    match /donations/{donationId} {
      allow create: if true;
      allow read: if request.auth != null;
      allow update, delete: if request.auth != null;
    }
  }
}
```

## Step 8: Test the Integration
1. Run `npm run dev`
2. Navigate to the app
3. Check browser console for any Firebase errors
4. Verify dogs load from Firestore (if you added sample data)

## Troubleshooting
- **Permission denied errors**: Check Firestore security rules
- **Config errors**: Verify Firebase configuration is correct
- **Network errors**: Check if Firestore is enabled and location is correct
- **Import errors**: Make sure Firebase is installed (`npm install firebase`)

## Next Steps
- Implement user authentication with Firebase Auth
- Add real-time updates with Firestore listeners
- Set up Firebase Storage for image uploads
- Add Firebase Functions for backend operations
