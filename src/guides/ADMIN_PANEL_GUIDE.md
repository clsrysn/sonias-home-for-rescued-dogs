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
- Real-time Statistics - Total dogs, available, and adopted counts
- Quick Actions - Add new dogs, edit existing ones
- Search & Filter - Find dogs quickly by status or category
- Responsive Design - Works on desktop, tablet, and mobile

### Navigation Elements
- Header - Shows online status, user email, and logout
- Stats Cards - Visual overview of your rescue population
- Management Table - Complete list of all dogs with actions
- Add Button - Prominent button to create new dog profiles

## Managing Dogs

### Adding a New Dog

#### Required Information
| Field | Description | Example |
|-------|-------------|---------|
| **Name** | Dog's display name | `"Buddy"` |
| **Age** | Age in text format | `"2"`, `"[Adult]"`, `"[Puppy]"` |
| **Description** | Brief summary for listings | `"A sweet and playful pup"` |
| **Category** | Must be exactly `"Puppies"` or `"Adults"` | `"Puppies"` |
| **Main Image** | File path for primary photo | `"src/assets/dogs/buddy.jpg"` |

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
1. Click the **Edit button** (pencil icon) in the table
2. Modify any fields as needed
3. Click **Update Dog** to save changes

### Deleting Dogs
⚠️ **Warning:** This action cannot be undone
1. Click the **Delete button** (trash icon)
2. Confirm the deletion in the popup

## Technical Requirements

### Developer Setup Checklist
Verify your development team has completed:

- [ ] **Firebase Authentication** - Email/password enabled
- [ ] **Admin Account Created** - Your login credentials provided
- [ ] **Firestore Security Rules** - Proper read/write permissions

### Security Considerations
- **Strong Passwords** - Use unique, complex passwords
- **Secure Connection** - Always access via HTTPS
- **Session Management** - Logout when finished
- **Limited Access** - Only share credentials with authorized staff