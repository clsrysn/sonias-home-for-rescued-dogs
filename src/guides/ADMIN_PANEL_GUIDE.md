# 🐕 Admin Panel Guide for Product Owners

> **Complete management system for your rescue organization's dog database**

---

## 📋 Table of Contents
1. [Getting Started](#1-getting-started)
2. [Dashboard Overview](#2-dashboard-overview) 
3. [Managing Dogs](#3-managing-dogs)
4. [Image Management](#4-image-management)
5. [Best Practices](#5-best-practices)
6. [Technical Requirements](#6-technical-requirements)

---

## 1. Getting Started

### 🔐 Account Setup
**Action Required:** Contact your development team to create your Admin Account in Firebase. You will receive:
- **Email Address** (e.g., `admin@yourrescue.org`)
- **Secure Password**
- **Login URL** (e.g., `yourwebsite.com/#/admin/login`)

### 🚀 First Login
1. Navigate to your admin login URL
2. Enter your provided credentials
3. You'll be redirected to the main dashboard

---

## 2. Dashboard Overview

### 📊 Key Features
- **Real-time Statistics** - Total dogs, available, and adopted counts
- **Quick Actions** - Add new dogs, edit existing ones
- **Search & Filter** - Find dogs quickly by status or category
- **Responsive Design** - Works on desktop, tablet, and mobile

### 🎯 Navigation Elements
- **Header** - Shows online status, user email, and logout
- **Stats Cards** - Visual overview of your rescue population
- **Management Table** - Complete list of all dogs with actions
- **Add Button** - Prominent button to create new dog profiles

---

## 3. Managing Dogs

### ➕ Adding a New Dog

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

### ✏️ Editing Existing Dogs
1. Click the **Edit button** (pencil icon) in the table
2. Modify any fields as needed
3. Click **Update Dog** to save changes

### 🗑️ Deleting Dogs
⚠️ **Warning:** This action cannot be undone
1. Click the **Delete button** (trash icon)
2. Confirm the deletion in the popup
3. Dog will be permanently removed from database

---

## 4. Image Management

### 📁 File Structure Requirements
```
src/assets/dogs/
├── buddy.jpg              # Main image
├── buddy/                 # Gallery folder
│   ├── photo1.jpg
│   ├── photo2.jpg
│   └── photo3.jpg
└── max/
    ├── max.jpg           # Main image
    └── gallery/
        ├── photo1.jpg
        └── photo2.jpg
```

### 🔄 Image Upload Workflow
1. **Prepare Images**
   - Main image: High-quality, well-lit photo
   - Gallery images: Multiple angles and activities
   - Optimize for web (JPG/PNG, under 2MB each)

2. **Send to Developer**
   - Email images with clear file names
   - Specify folder structure preferences
   - Request confirmation when uploaded

3. **Update Admin Panel**
   - Enter exact file path in "Image" field
   - Enter folder name in "Gallery Folder" field
   - Test that images display correctly

### 📸 Image Best Practices
- **Main Image**: Square or landscape orientation, dog clearly visible
- **Gallery Images**: Mix of portraits, action shots, and lifestyle photos
- **File Naming**: Use lowercase, no spaces (e.g., `buddy_playing.jpg`)
- **Quality**: Clear, well-lit photos that show the dog's personality

---

## 5. Best Practices

### 📝 Content Guidelines
- **Consistent Naming**: Use the same name across all platforms
- **Accurate Information**: Keep all details up-to-date
- **Engaging Descriptions**: Write compelling stories that connect with potential adopters
- **Honest Medical Info**: Be transparent about health needs and treatments

### 🔄 Regular Maintenance
- **Weekly Reviews**: Check for outdated information
- **Status Updates**: Mark dogs as adopted promptly
- **Photo Updates**: Add new photos when available
- **Seasonal Adjustments**: Update availability based on foster capacity

### 📊 Data Quality
- **Complete Profiles**: Fill out all optional fields when possible
- **Consistent Categories**: Use exact "Puppies" or "Adults" formatting
- **Proper Ages**: Use consistent age formatting
- **Working Links**: Ensure all image paths are valid

---

## 6. Technical Requirements

### ⚙️ Developer Setup Checklist
Verify your development team has completed:

- [ ] **Firebase Authentication** - Email/password enabled
- [ ] **Admin Account Created** - Your login credentials provided
- [ ] **Firestore Security Rules** - Proper read/write permissions
- [ ] **Image Storage** - Folder structure established
- [ ] **Backup System** - Regular database backups
- [ ] **SSL Certificate** - HTTPS enabled for production
- [ ] **Error Monitoring** - Logging and alerting setup

### 🔒 Security Considerations
- **Strong Passwords** - Use unique, complex passwords
- **Secure Connection** - Always access via HTTPS
- **Session Management** - Logout when finished
- **Limited Access** - Only share credentials with authorized staff

### 📱 Browser Compatibility
- **Chrome** (Recommended) - Full feature support
- **Firefox** - Compatible with all features
- **Safari** - Works on desktop and mobile
- **Edge** - Modern features supported

---

## 🆘 Troubleshooting

### 🔧 Common Issues

| Problem | Solution |
|---------|----------|
| **Can't login** | Check credentials, contact developer |
| **Images not showing** | Verify file paths with developer |
| **Changes not saving** | Check internet connection, try again |
| **Table not loading** | Refresh page, check for errors |
| **Delete not working** | Ensure you have proper permissions |

### 📞 Getting Help
1. **Check this guide** for step-by-step solutions
2. **Contact your developer** for technical issues
3. **Document the problem** - Screenshots help with debugging

---

## 📚 Additional Resources

### 📖 Related Documentation
- **User Guide** - For website visitors
- **Image Guidelines** - Photography best practices
- **Adoption Process** - Complete workflow documentation

### 🔄 Version History
- **v1.0** - Initial admin panel release
- **v1.1** - Enhanced UI and image management
- **v1.2** - Added bulk operations and export features

---

> **💡 Pro Tip:** Bookmark your admin login URL and save your credentials in a secure password manager for quick access!

---

*Last updated: {current_date}*  
*For technical support, contact your development team*