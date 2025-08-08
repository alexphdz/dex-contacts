# 📱 DEX - Contact Manager

A modern contact management application built with Vue 3, TypeScript, and Firebase. Manage your contacts with an intuitive interface, search functionality, and cloud storage.

**👨‍💻 Created by:** Alexis Palacios  
**🎯 Purpose:** Coding challenge for Dex application process

## ✨ Features

- 📋 Create, edit, and delete contacts
- 🔍 Search contacts by name or email
- 📷 Upload profile photos for contacts
- 📱 Fully responsive design (mobile & desktop)
- 🔄 Real-time data synchronization with Firebase
- ✅ Email validation
- 📄 Pagination for large contact lists

## 🛠️ Tech Stack

- **Frontend**: Vue 3 + TypeScript + Vite
- **Database**: Firebase Realtime Database
- **Storage**: Firebase Storage
- **Styling**: Tailwind CSS (custom design system)
- **Icons**: Material Symbols

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/alexphdz/dex-contacts.git
cd dex-contacts
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory with your Firebase configuration:

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Database URL
VITE_DB_URL=https://your_project-default-rtdb.firebaseio.com

# Storage URL
VITE_FIREBASE_STORAGE_BASE_URL=https://firebasestorage.googleapis.com/v0/b/your_project.firebasestorage.app/o
```

**🔑 How to get Firebase credentials:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Go to Project Settings > General
4. In "Your apps" section, add a web app
5. Copy the configuration values to your `.env.local`

### 4. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── features/contacts/   # Contact management feature
│   ├── components/      # Contact-specific components
│   ├── models/         # TypeScript interfaces
│   ├── service/        # Business logic layer
│   ├── client/         # API client layer
│   └── screens/        # Main screens/views
├── composables/        # Vue composables
└── lib/               # Third-party configurations
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run type-check` - Run TypeScript type checking
- `npm run preview` - Preview production build locally

## 🌟 Key Features Explained

### Contact Management
- Add new contacts with name, email, and profile photo
- Edit existing contact information
- Delete contacts with confirmation modal
- Automatic image cleanup when contacts are deleted

### Search & Pagination
- Real-time search by name or email
- Paginated results (5 contacts per page)
- Smart pagination that adjusts when filtering

### Data Validation
- Real-time email validation with regex
- Required field validation
- Form submission prevention until valid

## 📝 Notes

- All sensitive data (Firebase keys, URLs) are stored in environment variables
- Images are automatically resized and stored in Firebase Storage
- The app uses Firebase Realtime Database for instant data sync
- Responsive design works on all screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🎯 About This Project

This project was developed by **Alexis Palacios** as part of the coding challenge for the Dex application process. It demonstrates modern web development practices, clean code architecture, and proficiency with Vue.js ecosystem.

**Key technical decisions made:**
- Modular architecture with feature-based organization
- TypeScript for type safety and better developer experience
- Environment variables for secure configuration management
- Comprehensive error handling and user feedback
- Responsive design with mobile-first approach
- Real-time data synchronization with Firebase

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
