# AGENTS.md

## Project

This repository is for an Android-first React Native app called Focus Cat.

Focus Cat helps users run a focus session and count how many times they turn on or unlock their phone during the session.

## User goal

The owner wants a minimal MVP that can later be submitted to Google Play Console.

Prioritize:

1. Simplicity
2. Android functionality
3. Local-only privacy
4. Google Play readiness
5. Clean, beginner-friendly code

## Architecture

Use React Native for UI and Kotlin for Android native tracking.

Expected structure:

- src/App.tsx or src/App.tsx plus simple screen components
- src/components
- src/screens
- src/native
- src/storage
- android/app/src/main/java/com/tzuyu/focuscat for Kotlin native code

## Constraints

Do not add:

- Firebase
- Login
- Backend
- Ads
- Analytics
- Redux
- Complex navigation
- Accessibility Service
- UsageStats permission
- Device Admin

Do not collect or transmit personal data.

## Android tracking approach

Use a foreground service during focus sessions.

The foreground service should register a BroadcastReceiver for screen-related events while active.

Use a debounce to avoid double counting ACTION_SCREEN_ON and ACTION_USER_PRESENT when they happen close together.

Expose native methods to JavaScript:

- startFocusSession()
- stopFocusSession()
- getCurrentSessionState()

Emit event to JavaScript:

- FocusDistractionDetected

Event payload:

```json
{
  "count": 1,
  "timestamp": 1234567890
}
```
Commands
Use these commands when relevant:
```Bash
npm install
npm run android
cd android && ./gradlew assembleDebug
cd android && ./gradlew bundleRelease
```

Response style

When reporting back:

Be direct.
Give exact commands.
List changed files.
List next manual test steps.


---
