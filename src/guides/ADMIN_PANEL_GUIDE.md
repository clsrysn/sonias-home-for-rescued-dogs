# Admin Panel Guide for Product Owners

> **Complete management system for your rescue organization's dog database**

## Getting Started

### Account Setup
**Action Required:** Contact your development team to create your Admin Account in Firebase. You will receive:
- **Email Address** (e.g., `admin@yourrescue.org`)
- **Secure Password**
- **Login URL** (e.g., `yourwebsite.com/#/admin/login`)

### First Login
1. Navigate to your admin login URL
2. Enter your provided credentials
3. You'll be redirected to the main dashboard

## Dashboard Overview

### Key Features
- **Real-time Statistics** - Total dogs, available, and adopted counts
- **Quick Actions** - Add new dogs, edit existing ones
- **Search & Filter** - Find dogs quickly by status or category
- **Responsive Design** - Works on desktop, tablet, and mobile

### Navigation Elements
- **Header** - Shows online status, user email, and logout
- **Stats Cards** - Visual overview of your rescue population
- **Management Table** - Complete list of all dogs with actions
- **Add Button** - Prominent button to create new dog profiles

## Managing Dogs

### Adding a New Dog

#### Required Information
| Field | Description | Example |
|-------|-------------|---------|
| **Name** | Dog's display name | `"Buddy"` |
| **Age** | Age in text format | `"2"`, `"[Adult]"`, `"[Puppy]"` |
| **Description** | Brief summary for listings | `"A sweet and playful pup"` |
| **Category** | Must be exactly `"Puppies"` or `"Adults"` | `"Puppies"` |
| **Main Image** | URL path for primary photo | `"/dogs/buddy.jpg"` |

#### Optional Information
| Field | Description | Best Practices |
|-------|-------------|----------------|
| **Status** | Adoption toggle (Available/Adopted) | Update immediately when adopted |
| **Background Story** | Rescue history and journey | Be detailed and engaging |
| **Personality** | Behavior traits and temperament | Help families match |
| **Medical Information** | Health status and treatments | Be transparent about needs |
| **Adoption Details** | Fees, requirements, process | Clear expectations for adopters |
| **Gallery Folder** | Multiple photos location | `"buddy"` (folder name) |

### Editing Existing Dogs
1. Click **Edit button** (pencil icon) in the table
2. Modify any fields as needed
3. Click **Update Dog** to save changes

### Deleting Dogs
**Warning:** This action cannot be undone
1. Click **Delete button** (trash icon)
2. Confirm deletion in the popup

## Image Management

### How Photos Work Now
- **Images are stored** in the `public/dogs/` folder
- **Database stores** the path (e.g., `/dogs/buddy.jpg`)
- **Website loads** images directly from Firebase Hosting
- **No more bundling** - Images aren't included in the JavaScript bundle

### Adding New Dog Photos
1. Place images in: `public/dogs/dog-name.jpg`
2. In the admin panel, set image path to: `/dogs/dog-name.jpg`
3. For multiple photos: Create folder `public/dogs/dog-name/` and set gallery to `dog-name`

## Technical Requirements

### Developer Setup Checklist
Verify your development team has completed:

- [x] **Firebase Authentication** - Email/password enabled 
- [x] **Admin Account Created** - Your login credentials provided 
- [x] **Firestore Security Rules** - Proper read/write permissions 
- [x] **Firebase Hosting** - Images served from `public/dogs/` 
- [x] **Database Migration** - All dogs moved to Firebase 

### Security Considerations
- **Strong Passwords** - Use unique, complex passwords
- **Secure Connection** - Always access via HTTPS
- **Session Management** - Logout when finished
- **Limited Access** - Only share credentials with authorized staff

## **Support & Troubleshooting**

### Common Issues
- **Images not loading?** Check that files are in `public/dogs/` folder
- **Changes not showing?** Refresh the browser or clear cache
- **Can't login?** Contact development team for password reset

### Get Help
- **Technical issues:** Contact your development team
- **Training needed:** Request a walkthrough of the admin panel
- **Feature requests:** Submit suggestions for improvements