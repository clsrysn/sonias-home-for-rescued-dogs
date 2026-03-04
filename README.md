# SHARE: Sonia's Home Animal Rescue & Education

SHARE is a comprehensive platform designed to facilitate dog adoptions, manage rescue operations, and provide educational resources for pet ownership.

## Project Overview
The platform connects rescue dogs with potential adopters while providing administrators with a secure, cloud-based management system. The architecture leverages a modern React-based frontend with Firebase backend services for scalable, real-time data management.

## Key Features

### Public-Facing Platform
*   **Adoption Portal:** Filterable, mobile-responsive gallery of available dogs with detailed profiles.
*   **Donation Center:** Support for multiple donation types with transparent fund allocation.
*   **Resource Library:** Educational content on animal welfare and rescue missions.

### Administrative System
*   **Management Dashboard:** Secure CRUD operations for dog profiles and adoption statuses.
*   **Image Management:** Integrated media handling for dog photos.
*   **Access Control:** Firebase Authentication for secure admin account management.

## Technical Stack

*   **Frontend:** React 18, TypeScript, Vite.
*   **Styling:** Tailwind CSS, shadcn/ui.
*   **Backend & Hosting:** Firebase Firestore (Database), Firebase Authentication, Firebase Hosting.
*   **Development Tools:** ESLint, Vitest, PostCSS.

## Setup and Development

### Prerequisites
*   Node.js (v18+)
*   npm

### Installation
1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Build the project: `npm run build` 
4. Deploy to Firebase: `npm run deploy`

### Available Commands
*   `npm run dev`: Start development server.
*   `npm run build`: Build for production.
*   `npm run test`: Run unit tests.
*   `npm run deploy`: Deploy to Firebase Hosting.

## Deployment & Production
*   **Project ID:** `share-website-34675`
*   **Production URL:** [https://share-website-34675.web.app](https://share-website-34675.web.app)
*   **Admin Access:** `/admin/login`

## Architecture
*   **Components:** Organized by domain logic in `src/components/`.
*   **Data Layer:** Managed through `src/firebase/` for database interactions.
*   **State:** Handled via React Context for authentication and global application state.

## Maintenance
*   **Technical Support:** Manage database and auth via the Firebase Console.
*   **Documentation:** Review internal guides located in `src/guides/`.
*   **Updates:** Dependencies should be updated monthly; ensure regular backups of the Firestore database.