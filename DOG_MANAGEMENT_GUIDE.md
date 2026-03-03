# How to Update Dog Information - Simple Guide for Ms. Sonia

## What We've Built

We've created a **"Single Source of Truth"** system where you only need to update dog information in **ONE place** and it automatically appears everywhere!

## How It Works

### 1. **Single Data File** (`src/data/dogs.ts`)
- **Add new dogs**: Just add a new object to the `allDogs` array
- **Update existing dogs**: Just edit the object properties
- **Mark as adopted**: Change `adopted: false` to `adopted: true`

### 2. **Automatic Updates Everywhere**
When you update the dog data, it automatically appears in:
- **Homepage Featured Dogs** (3 random dogs each page load)
- **Gallery Page** (all dogs with filtering)
- **Individual Dog Pages** (detailed profiles)

---

## 📝 How to Add/Update a Dog

### Adding a New Dog
```javascript
{
  id: "new-dog-name",           // Unique identifier (no spaces)
  image: dogImage,               // Main photo (imported at top)
  name: "Dog's Name",           // Display name
  age: "[Adult]" or "[Puppy]", // Age 
  description: "Brief description", // Short description for cards
  category: "Adults" or "Puppies", // Filter category
  adopted: false,                // Shows/hides adoption button
  background: "Full story...",    // Dog's background story
  personality: "Personality traits...", // Dog's personality
  medical: "Medical info...",     // Medical history
  adoptionDetails: "Adoption info..." // Adoption requirements
}
```

### Updating an Existing Dog
1. Find the dog object in `src/data/dogs.ts`
2. Change any property you want
3. Save the file

---

## How Photos Work

### Main Dog Photos
- **Location**: `src/assets/dogs/{dog-name}.jpg`
- **Example**: `src/assets/dogs/kool.jpg`
- **Purpose**: Main profile picture and gallery thumbnails

### Dog Photo Galleries
- **Location**: `src/assets/dogs/{dog-name}/` (folder)
- **Example**: `src/assets/dogs/kool/`
- **How**: Drop any images in the folder
- **Formats**: `.jpg`, `.png`, `.gif`, `.webp`, `.svg`
- **Result**: All images automatically appear in dog's photo gallery

### "Where Your Money Goes" Images
- **Location**: `src/assets/where_money_goes/`
- **How**: Drop any images in the folder
- **Result**: Images automatically appear in donation page

---

## Quick Start Checklist

To add a new dog named "Buddy":

1. **Add main photo**: `src/assets/dogs/buddy.jpg`
2. **Create photo folder**: `src/assets/dogs/buddy/`
3. **Add gallery photos**: Drop any photos in the buddy folder
4. **Update data**: Add Buddy's object to `src/data/dogs.ts`
5. **Done!** Buddy appears everywhere automatically

---

### Dog ID Rules
- Use lowercase, no spaces: `"buddy"`, `"maxx"`, `"poypoy"`
- Make it unique: No two dogs should have the same ID
- Match folder names: ID should match folder names

### Categories
- `"Puppies"` for young dogs
- `"Adults"` for grown dogs
- Used for filtering in Gallery

### Adoption Status
- `adopted: false` = Shows "Support Care" button
- `adopted: true` = Hides adoption button
- Managing availability

---