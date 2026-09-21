# Assignment 2: Student Information Management using Props

A React application implementing a **Student Information Portal** demonstrating **Props, Component Reusability, Data Passing**, and dynamic **CGPA Sorting**.

---

## 🎯 Assignment Objectives & Requirements

1. **Required Components**:
   - **`App`**: Top-level state manager. Holds student data, coordinates CGPA sorting logic, and supplies data/callbacks through props.
   - **`Header`**: Portal header receiving `title`, `subtitle`, `institution`, and statistics props (`totalStudents`, `topCgpa`, `avgCgpa`).
   - **`StudentList`**: Parent list component receiving `students`, `sortOrder`, `onSortChange`, `selectedDept`, `searchTerm`, and rendering cards.
   - **`StudentCard`**: Reusable card component displaying student details received via individual props (`name`, `rollNumber`, `department`, `semester`, `cgpa`, `photo`).
   - **`Footer`**: Footer component receiving metadata props (`portalName`, `institution`, `academicYear`, `courseCode`).

2. **Required Student Card Fields**:
   - Name
   - Roll Number
   - Department
   - Semester
   - CGPA (with tier color badges: Outstanding, Distinction, Good)
   - Photo (with fallback UI avatar error handling)

3. **Data Passing via Props**:
   - Every single component receives its data and actions exclusively via standard React **Props**.

4. **CGPA Sorting Mechanism**:
   - **High → Low (↓)**: Sorts students from highest CGPA to lowest.
   - **Low → High (↑)**: Sorts students from lowest CGPA to highest.
   - **Reset (Default)**: Restores original roll order.

---

## 🗂️ Component & Data Flow Hierarchy

```text
App (manages students, sortOrder, and calculates statistics)
 ├── Header
 │     └── Props: title, subtitle, institution, totalStudents, topCgpa, avgCgpa
 ├── StudentList
 │     ├── Props: students, sortOrder, onSortChange, selectedDept, onDeptChange, searchTerm, onSearchChange, departments
 │     └── StudentCard (x N)
 │           └── Props: name, rollNumber, department, semester, cgpa, photo
 └── Footer
       └── Props: portalName, institution, academicYear, courseCode
```

---

## 📁 Directory Structure

```
D:\Frontend_Dev_Task\Assign2\
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── StudentCard.jsx
│   │   └── StudentList.jsx
│   ├── data/
│   │   └── studentsData.js
│   ├── styles/
│   │   ├── Footer.css
│   │   ├── Header.css
│   │   ├── index.css
│   │   ├── StudentCard.css
│   │   └── StudentList.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 How to Run the Project

### 1. Open Terminal in Assign2
```powershell
cd D:\Frontend_Dev_Task\Assign2
```

### 2. Install Dependencies (if not already installed)
```powershell
npm install
```

### 3. Start Development Server
```powershell
npm run dev
```
Open `http://localhost:3001` in your browser.

### 4. Build for Production
```powershell
npm run build
```
Generates production build in `dist/`.

