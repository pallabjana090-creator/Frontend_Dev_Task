# Assignment 1: React Environment Setup and Personal Portfolio

A modern, responsive personal portfolio web application developed with **React**, **JSX**, and **External CSS**.

---

## 🚀 Project Overview

This project satisfies all requirements for **Assignment 1: React Environment Setup and Personal Portfolio**:
- **Pre-requisite Demonstration**: Setup of React environment using Vite, pure JSX components, reusable component architecture, and structured project directories.
- **Components Included**:
  1. `Navbar.jsx`: Fixed glassmorphism navigation with mobile menu drawer & active scrolling.
  2. `Header.jsx`: Hero banner with developer greeting, role, call-to-action buttons, and floating badges.
  3. `About.jsx`: About Me section with personal narrative and 4 highlight metric cards.
  4. `Education.jsx`: Academic timeline displaying degrees, institutions, GPA/grades, and coursework.
  5. `EducationCard.jsx`: **Reusable** sub-component for academic achievements.
  6. `Skills.jsx`: Categorized technical skill sets (Frontend, Backend, Languages & Core).
  7. `SkillBadge.jsx`: **Reusable** sub-component rendering skill proficiency indicators.
  8. `Contact.jsx`: Contact information with direct links and an interactive submission form with React state.
  9. `Footer.jsx`: Brand details, quick jump navigation, copyright, and smooth back-to-top button.
- **Constraints Met**:
  - Minimum 6 components: Exceeded with **9 modular components**.
  - **Responsive design**: Mobile-first layout with CSS Grid, Flexbox, and media queries (`max-width: 968px`, `768px`, `640px`, `480px`).
  - **External CSS**: Pure external CSS files located in `src/styles/` (`index.css`, `Navbar.css`, `Header.css`, `About.css`, `Education.css`, `Skills.css`, `Contact.css`, `Footer.css`). No inline styles or CSS-in-JS libraries.
  - **JSX Only**: Pure React JSX syntax across all components.

---

## 📁 Project Structure

```
D:\Frontend_Dev_Task\Assign1\
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Education.jsx
│   │   ├── EducationCard.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Navbar.jsx
│   │   ├── SkillBadge.jsx
│   │   └── Skills.jsx
│   ├── styles/
│   │   ├── About.css
│   │   ├── Contact.css
│   │   ├── Education.css
│   │   ├── Footer.css
│   │   ├── Header.css
│   │   ├── index.css
│   │   ├── Navbar.css
│   │   └── Skills.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🛠️ How to Run the Project

### 1. Open Terminal in the Project Directory
```powershell
cd D:\Frontend_Dev_Task\Assign1
```

### 2. Install Dependencies (if not already installed)
```powershell
npm install
```

### 3. Start the Development Server
```powershell
npm run dev
```
The portfolio will be live at `http://localhost:3000` (or the port displayed in your terminal).

### 4. Build for Production
```powershell
npm run build
```
The production bundle will be generated in `dist/`.

