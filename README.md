# 🎮 Playo.io - Sports Social Network

A mobile app to connect sports players in Pakistan.

## 📁 Simple Folder Structure

```
app/
  _layout.tsx      → Main app wrapper
  index.tsx        → Entry point (redirects users)
  login.tsx        → Login/Signup screen
  verify-otp.tsx   → OTP verification
  reset-password.tsx → Password reset
  setup.tsx        → Profile setup (2 steps only!)
  (tabs)/          → Main app screens after login
    home.tsx       → Home dashboard
    explore.tsx    → Find games

components/        → Reusable UI pieces
constants/         → App colors & styles
context/           → User authentication state
lib/               → Backend connection (Appwrite)
types/             → TypeScript types
```

## 🚀 App Flow (Easy to Understand!)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   1. LOGIN SCREEN (/login)                                  │
│      └─ User creates account or signs in                    │
│                     ↓                                       │
│   2. OTP VERIFICATION (/verify-otp)                         │
│      └─ Enter 6-digit code from email                       │
│                     ↓                                       │
│   3. PROFILE SETUP (/setup)                                 │
│      └─ Step 1: Pick sports + skill level                   │
│      └─ Step 2: Select city + bio                           │
│                     ↓                                       │
│   4. HOME (/(tabs)/home)                                    │
│      └─ Main app dashboard                                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env` file** with your Appwrite credentials:
   ```
   EXPO_PUBLIC_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
   EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
   EXPO_PUBLIC_APPWRITE_PROFILES_COLLECTION_ID=your_collection_id
   ```

3. **Run the app:**
   ```bash
   npx expo start
   ```

4. **Scan QR code** with Expo Go app on your phone

## 📱 Features

- ✅ Email/Password Login
- ✅ OTP-based Login (no password needed!)
- ✅ Password Reset via OTP
- ✅ Profile Setup (Sports, Skill, City)
- ✅ Dark Mode Support
- ✅ Saves profile to Appwrite database

## 🎯 Supported Sports

- 🎾 Tennis
- 🏸 Badminton
- 🏏 Cricket
- ⚽ Futsal
- 🎾 Padel

## 🏙️ Supported Cities

Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, Hyderabad, Gujranwala, Sialkot, Mardan

## 📞 Need Help?

The code is organized simply:
- **Screens** are in `app/` folder
- **Styles** are in `constants/theme.ts`
- **User data** is handled by `context/AuthContext.tsx`
- **Backend calls** are in `lib/` folder
