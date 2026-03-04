# Admin Panel Setup Guide

## Overview
The admin panel provides a complete CRUD interface for managing dogs in the Firebase database with email/password authentication.

## Features
- **Firebase Authentication**: Secure email/password login
- **Dog Management**: Full CRUD operations (Create, Read, Update, Delete)
- **Protected Routes**: Admin-only access to management features
- **Modern UI**: Built with shadcn/ui components
- **Responsive Design**: Works on desktop and mobile

## Accessing the Admin Panel

### 1. Navigate to Admin Login
Go to: `http://localhost:8080/#/admin/login`

### 2. Login with Firebase Credentials
Use your Firebase email/password credentials that have access to the Firestore database.

### 3. Admin Dashboard
After login, you'll be redirected to: `http://localhost:8080/#/admin`


### ➕ Add New Dog
Navigate to: `/admin/dogs/new`

**Required Fields:**
- Name
- Age
- Description
- Image Path
- Category

**Optional Fields:**
- Background & Story
- Personality
- Medical Information
- Adoption Details
- Gallery Folder Name
- Adoption Status

### ✏️ Edit Existing Dog
Click the edit button in the table or navigate to: `/admin/dogs/:id/edit`

### 🗑️ Delete Dog
Click the delete button in the table. Confirmation required before deletion.

## Field Descriptions

### Basic Information
- **name**: Dog's name (required)
- **age**: Age as string, e.g., "2", "[Adult]", "[Puppy]" (required)
- **description**: Brief description (required)
- **image**: File path to main image, e.g., "src/assets/dogs/kool.jpg" (required)
- **category**: "Puppies" or "Adults" (required)
- **galleryImages**: Folder name for photo gallery, e.g., "kool"
- **adopted**: Boolean for adoption status

### Detailed Information
- **backgroundStory**: Dog's rescue story and background
- **personality**: Personality traits and behavior
- **medicalInformation**: Medical history, vaccinations, etc.
- **adoptionDetails**: Adoption requirements, fees, process

## File Structure for Images

### Main Image
```
src/assets/dogs/
├── kool.jpg          # Main image for Kool
├── mapua.jpg         # Main image for Mapua
└── poypoy.jpg        # Main image for Poypoy
```

### Gallery Images
```
src/assets/dogs/
├── kool/             # Gallery folder for Kool
│   ├── photo1.jpg
│   ├── photo2.jpg
│   └── photo3.jpg
├── mapua/            # Gallery folder for Mapua
│   ├── photo1.jpg
│   └── photo2.jpg
```

## Firebase Setup

### 1. Enable Authentication
1. Go to Firebase Console
2. Select your project
3. Go to Authentication → Sign-in method
4. Enable "Email/Password" provider

### 2. Create Admin User
1. In Firebase Console → Authentication
2. Click "Add user"
3. Enter admin email and password
4. Click "Add user"

### 3. Firestore Rules
Ensure your Firestore security rules allow authenticated users to read/write:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read all dogs
    match /dogs/{dogId} {
      allow read: if true;
      allow write, delete: if request.auth != null;
    }
    
    // Only authenticated users can manage donations
    match /donations/{donationId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## URL Structure

### Public Routes
- `/` - Home page
- `/gallery` - Dog gallery
- `/dog/:id` - Individual dog profile
- `/donate` - Donation page
- `/about` - About page
- `/updates` - Social media updates

### Admin Routes (Protected)
- `/admin/login` - Admin login
- `/admin` - Admin dashboard
- `/admin/dogs/new` - Add new dog
- `/admin/dogs/:id/edit` - Edit existing dog

## Security Features

### Authentication
- Firebase Auth integration
- Session management
- Automatic logout on token expiration

### Route Protection
- ProtectedRoute component wraps admin routes
- Redirects to login if not authenticated
- Loading states during auth checks

### Data Validation
- Required field validation
- Type checking for form inputs
- Error handling and user feedback

## Troubleshooting

### Login Issues
- Check Firebase Auth is enabled
- Verify email/password credentials
- Check Firestore rules for auth requirements

### Image Loading Issues
- Verify file paths are correct
- Check folder structure matches galleryImages field
- Ensure images exist in src/assets/dogs/

### CRUD Operations
- Check Firestore permissions
- Verify Firebase project configuration
- Check browser console for errors

## Development Notes

### Component Structure
```
src/
├── contexts/
│   └── AuthContext.tsx       # Authentication state management
├── components/
│   ├── ProtectedRoute.tsx    # Route protection wrapper
│   └── ui/
│       ├── switch.tsx        # Custom switch component
│       └── select.tsx        # Custom select component
├── pages/
│   ├── Login.tsx             # Admin login page
│   ├── AdminDashboard.tsx   # Main admin dashboard
│   └── DogForm.tsx          # Create/edit dog form
└── firebase/
    └── database.ts           # Firestore CRUD operations
```

### Key Dependencies
- Firebase Auth for authentication
- Firebase Firestore for database
- React Router for navigation
- shadcn/ui for UI components
- Lucide React for icons

## Production Deployment

1. **Environment Variables**: Set Firebase config in production
2. **Authentication**: Enable proper auth providers
3. **Security Rules**: Implement strict Firestore rules
4. **HTTPS**: Ensure admin panel is served over HTTPS
5. **Monitoring**: Add error tracking and analytics

## Support

For issues or questions:
1. Check browser console for errors
2. Verify Firebase configuration
3. Review Firestore security rules
4. Test authentication flow
