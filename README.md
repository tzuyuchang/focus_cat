# Focus Cat Lite

Focus Cat Lite is a cute, local-only focus timer app for Android.

Users choose a focus mode, start a focus session, manually tap **I got distracted** whenever they lose focus, and see total focus time plus distraction count at the end.

This Lite release does not use automatic screen wake tracking, background tracking, login, ads, analytics, or a backend.

## Getting Started

> Make sure you have completed the React Native environment setup instructions before proceeding.

### Start Metro

```bash
npm start
```

### Run on Android

```bash
npm run android
```

## App Flow

- Home screen: choose a focus mode and start a session
- Focus screen: view the timer, distraction counter, and manual distraction test button
- Result screen: review total focus time and total distractions

## Privacy

Focus Cat Lite keeps data local on the device and does not send user data to a server.

The app does not use:

- Firebase
- Login
- Backend
- Ads
- Analytics
- Accessibility Service
- UsageStats permission
- Device Admin

## Development Notes

- App name: Focus Cat
- Package name: unchanged for now
- Platform focus: Android first
