# Onboarding & Authentication Flow

## Overview
This document describes the complete onboarding and authentication flow implementation using AsyncStorage and Expo Router.

## Flow Diagram

```
App Launch (Splash Screen)
    ↓
Check AsyncStorage
    ↓
    ├─→ First Time User (hasSeenOnboarding = false)
    │       ↓
    │   Onboarding Screens (1-4)
    │       ↓
    │   Mark hasSeenOnboarding = true
    │       ↓
    │   Navigate to Login
    │
    ├─→ Returning User - Not Authenticated
    │       ↓
    │   Navigate to Login
    │       ↓
    │   After Login: setIsAuthenticated(true)
    │       ↓
    │   Navigate to Home/Tabs
    │
    └─→ Returning User - Authenticated
            ↓
        Navigate directly to Home/Tabs
```

## Key Files

### 1. Storage Utilities (`src/utils/storage.ts`)
Manages all AsyncStorage operations:
- `getHasSeenOnboarding()` / `setHasSeenOnboarding()`
- `getIsAuthenticated()` / `setIsAuthenticated()`
- `getUserToken()` / `setUserToken()` / `clearUserToken()`
- `clearAll()` - Clears authentication data (for logout)

### 2. App Initialization Hook (`src/hooks/useAppInitialization.ts`)
- Checks onboarding and authentication status on app launch
- Handles navigation logic based on user state
- Used in the splash screen (`src/app/index.tsx`)

### 3. Authentication Hook (`src/hooks/useAuth.ts`)
Provides authentication utilities:
- `login(token)` - Stores token and navigates to main app
- `logout()` - Clears data and navigates to login

### 4. Updated Screens

#### Splash Screen (`src/app/index.tsx`)
- Shows splash screen while checking storage
- Uses `useAppInitialization` hook
- Automatically navigates based on user state

#### Onboarding Screen (`src/app/onboarding.tsx`)
- Marks onboarding as completed when user finishes
- Calls `storage.setHasSeenOnboarding(true)`
- Navigates to login after completion

#### Login Screen (`src/app/(auth)/login.tsx`)
- Sets authentication status on successful login
- Stores user token
- Navigates to main app

#### Register Screen (`src/app/(auth)/register.tsx`)
- Can auto-login user after registration
- Or redirect to login screen
- Currently set to auto-login

## Storage Keys

```typescript
@has_seen_onboarding  // "true" | "false"
@is_authenticated     // "true" | "false"
@user_token          // string | null
```

## Usage Examples

### Logout from any screen
```typescript
import { useAuth } from "@/hooks/useAuth";

function ProfileScreen() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    // User will be redirected to login screen
  };

  return (
    <TouchableOpacity onPress={handleLogout}>
      <Text>Logout</Text>
    </TouchableOpacity>
  );
}
```

### Check authentication status
```typescript
import { storage } from "@/utils/storage";

const isAuth = await storage.getIsAuthenticated();
const token = await storage.getUserToken();
```

### Manual login
```typescript
import { useAuth } from "@/hooks/useAuth";

function CustomLoginScreen() {
  const { login } = useAuth();

  const handleLogin = async () => {
    // Your API call here
    const response = await api.login(email, password);
    
    // Store token and navigate
    await login(response.token);
  };
}
```

## Testing the Flow

### Test First Time User
1. Clear app data or reinstall
2. Launch app → Should see onboarding
3. Complete onboarding → Should navigate to login
4. Close and reopen app → Should go directly to login (skip onboarding)

### Test Authenticated User
1. Login successfully
2. Close and reopen app → Should go directly to home/tabs

### Test Logout
1. Call `logout()` from any screen
2. Should clear authentication and navigate to login
3. Reopen app → Should go to login (not onboarding)

### Reset Onboarding (for testing)
```typescript
import AsyncStorage from "@react-native-async-storage/async-storage";

// Clear all data including onboarding flag
await AsyncStorage.clear();
```

## Navigation Rules

| Condition | Destination |
|-----------|-------------|
| First launch (no onboarding flag) | Onboarding |
| Onboarding completed, not authenticated | Login |
| Onboarding completed, authenticated | Home/Tabs |
| User logs out | Login (onboarding flag remains) |
| App data cleared/reinstalled | Onboarding |

## Important Notes

1. **Onboarding is shown only once** - The flag persists until app data is cleared
2. **Authentication is separate** - Logging out doesn't reset onboarding
3. **Splash screen shows during initialization** - Prevents flash of wrong screen
4. **All navigation is automatic** - Based on storage state
5. **Token storage is included** - Ready for API integration

## Future Enhancements

- Add token refresh logic
- Implement biometric authentication
- Add "Skip" option to bypass onboarding (already has skip button per screen)
- Add analytics tracking for onboarding completion
- Implement secure storage for sensitive tokens (use expo-secure-store)
