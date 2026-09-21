# Assignment 7: Authentication System with LocalStorage & Route Protection

Integrated single-page web application featuring an **Authentication System** combined with the **Assignment 6 Task Manager**, built using **React 18**, **React Router v6**, and **Vite**.

---

## 🎯 Problem Statement Fulfillment

| Requirement | Implementation Detail | Location |
| :--- | :--- | :--- |
| **Login** | Full login page with credentials validation, demo auto-fill, and redirect to target page. | `src/pages/LoginPage.jsx` |
| **Logout** | Header action that purges session tokens and state, redirecting securely to `/login`. | `src/components/Layout.jsx`, `src/context/AuthContext.jsx` |
| **Protected Dashboard** | Accessible only with valid simulated JWT session; shows user avatar, stats, metrics, and token status. | `src/pages/DashboardPage.jsx`, `src/components/ProtectedRoute.jsx` |
| **Remember User** | Checkbox that saves/removes remembered username in `localStorage` under key `taskflow_remembered_user`. | `src/pages/LoginPage.jsx`, `src/context/AuthContext.jsx` |
| **JWT Token Simulation** | Realistic 3-part base64 URL encoded token (`header.payload.signature`) stored under `taskflow_jwt_token` in `localStorage` with exp claim validation. | `src/utils/jwtUtils.js`, `src/components/JwtInspectorModal.jsx` |
| **Validation: Username Required** | Triggers error prompt if username input is empty or contains only whitespace. | `src/pages/LoginPage.jsx` |
| **Validation: Password Required** | Triggers error prompt if password input is empty. | `src/pages/LoginPage.jsx` |
| **Validation: Password Strength** | Dynamic 4-tier score meter (Weak, Fair, Good, Strong) evaluating length, uppercase, lowercase, numbers, and special characters with visual progress bar and checklist. | `src/components/PasswordStrengthMeter.jsx` |

---

## 🏗️ Architecture & Component Directory

```
Assign7/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── App.jsx                       # Route tree (public /login + guarded routes)
    ├── main.jsx                      # React 18 DOM mount point
    ├── components/
    │   ├── JwtInspectorModal.jsx     # Live modal decoding and inspecting LocalStorage JWT
    │   ├── Layout.jsx                # App shell, persistent navigation, user badge, logout button
    │   ├── PasswordStrengthMeter.jsx # Visual checklist & strength bar (Weak -> Strong)
    │   ├── ProtectedRoute.jsx        # Route guard checking auth token and expiration
    │   └── TaskCard.jsx              # Task card linking to dynamic route /tasks/:taskId
    ├── context/
    │   ├── AuthContext.jsx           # Authentication state, login(), logout(), LocalStorage sync
    │   └── TaskContext.jsx           # Task CRUD state (Assignment 6 integrated)
    ├── pages/
    │   ├── LoginPage.jsx             # Public login with validations & remember me
    │   ├── DashboardPage.jsx         # Protected dashboard with overview and metrics
    │   ├── TasksPage.jsx             # Filterable task directory
    │   ├── TaskDetailsPage.jsx       # Dynamic route view with edit & delete
    │   ├── AddTaskPage.jsx           # New task creation form with validation
    │   ├── CompletedTasksPage.jsx    # Archive of finished tasks
    │   └── NotFoundPage.jsx          # 404 handler
    ├── styles/
    │   ├── Auth.css                  # Login styling, strength meter, validation errors
    │   ├── Dashboard.css             # Stats grid, quick actions, security card
    │   ├── Forms.css                 # Form input & button designs
    │   ├── Layout.css                # Navbar, user badge, JWT inspector button
    │   ├── TaskDetails.css           # Task details layout
    │   ├── Tasks.css                 # Grid & filters
    │   └── index.css                 # CSS variables, reset, theme tokens
    └── utils/
        └── jwtUtils.js               # JWT simulation: generateToken, decodeToken, isTokenExpired
```

---

## 🔑 JWT Simulation Details

The simulated JWT follows the standard RFC 7519 structure:
```
<header>.<payload>.<signature>
```
1. **Header**: `{"alg": "HS256", "typ": "JWT"}`
2. **Payload**:
   ```json
   {
     "sub": "user_id",
     "username": "alex.morgan@taskflow.dev",
     "name": "Alex Morgan",
     "role": "Lead Architect",
     "iat": 1726915000,
     "exp": 1726922200
   }
   ```
3. **Signature**: Simulated HMAC-SHA256 signature hash.

### LocalStorage Keys Used
- `taskflow_jwt_token`: Holds the 3-part simulated JWT.
- `taskflow_user`: Holds serialized user profile.
- `taskflow_remembered_user`: Holds remembered username when checkbox is checked.

---

## 🚀 Running the Project

```bash
# 1. Navigate to directory
cd D:\Frontend_Dev_Task\Assign7

# 2. Install dependencies (if needed)
npm install

# 3. Start Vite dev server on port 3006
npm run dev

# 4. Production build verification
npm run build
```

