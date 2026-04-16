# Firebase Auth Reactivation TODO

## Status: Planning Approved - Ready for Implementation

### Step 1: Create Core Files [x]

- src/context/AuthContext.tsx
- src/hooks/useAuth.ts
- src/lib/firebaseAuthService.ts

### Step 2: Update Root Layout [x]

- src/app/layout.tsx: Wrap with AuthContext.Provider

### Step 3: Fix Auth Pages [ ]

- src/app/(auth)/login/page.tsx
- src/app/(auth)/register/page.tsx
- src/app/(auth)/forgot-password/page.tsx (if needed)

### Step 4: Update Components [x]

- src/components/auth/AuthRouteGuard.tsx: Use useAuth hook
- src/components/layout/Header.tsx: Use useAuth if needed

### Step 5: Safety Tests [ ]

- Backend login/register unchanged
- Firebase flows work + sync
- UI/products intact

### Step 6: Complete [ ]
