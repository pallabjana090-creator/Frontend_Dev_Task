# Assignment 3: Farm Employee Directory using State and Events

A comprehensive React application managing agricultural farm employee records, demonstrating `useState()`, Event Handling, and Conditional Rendering.

---

## 🌾 Problem Statement & Requirements Met

Farm employee data is maintained with the following 7 required fields:
1. **Name**
2. **Employee ID** (e.g. `FRM-101`)
3. **Department Name** (e.g. `Crop Production & Grain`, `Dairy & Livestock`, `Greenhouse & Horticulture`, etc.)
4. **Gender** (`Male` / `Female` / `Other`)
5. **Phone Number**
6. **Local address** (e.g. Farm staff quarters, on-site housing)
7. **Permanent address** (Home town / native city)

### ✨ Key Features Implemented:
- **➕ Add Employee**: Modal form with controlled inputs, field validation, and insertion into `employees` state.
- **✏️ Edit Employee details**: Pre-populates the modal form with existing data, commits modifications back to state.
- **🗑️ Delete Employee**: Triggers a confirmation dialog prior to removing the employee from state.
- **🔍 Search Employee**: Real-time filtering across Name, Employee ID, or Phone number.
- **📊 Employee Count**: Live metric counters displaying Total Farm Staff, Active Filtered Staff, and Department counts.
- **🌾 Department Filter**: Multi-option filtering using both a `<select>` dropdown and quick filter pills.

---

## ⚛️ React Concepts Demonstrated

### 1. `useState()` State Management
- `employees`: Array of employee objects initialized with seed farm data.
- `searchTerm`: Search query string for real-time filtering.
- `selectedDepartment`: Active department filter.
- `isModalOpen`: Boolean controlling Add/Edit modal visibility.
- `employeeToEdit`: Stores the employee object currently being edited (or `null` when adding).
- `deleteCandidate`: Stores the employee targeted for deletion confirmation.
- `notification`: Toast message and status type (`success` or `danger`).

### 2. Event Handling
- `onSubmit`: Handles form submission, calls `e.preventDefault()`, runs validations, and persists records.
- `onChange`: Controlled inputs for text, select, and textarea fields in modal and search bar.
- `onClick`: Triggers modal open/close, delete confirmations, filter selections, and toast dismissals.

### 3. Conditional Rendering
- `{isModalOpen && <EmployeeModal ... />}`: Renders Add/Edit modal only when active.
- `{deleteCandidate && <DeleteConfirmModal ... />}`: Renders deletion confirmation popup.
- Dynamic modal titles and button texts based on `{employeeToEdit ? 'Edit' : 'Add'}`.
- `{filteredEmployees.length > 0 ? <EmployeeGrid /> : <EmptyState />}`: Renders custom empty state when no employees match filters.
- `{notification && <ToastBanner />}`: Renders temporary action notifications.

---

## 📁 Directory Structure

```
D:\Frontend_Dev_Task\Assign3\
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── DeleteConfirmModal.jsx # Delete confirmation dialog
│   │   ├── DirectoryControls.jsx  # Search, department filter & add button
│   │   ├── EmployeeCard.jsx       # Card displaying all 7 fields + actions
│   │   ├── EmployeeModal.jsx      # Modal form for Add / Edit
│   │   ├── Footer.jsx             # Directory footer
│   │   └── Header.jsx             # Header with live employee counters
│   ├── data/
│   │   └── farmEmployeesData.js   # Farm employee seed records
│   ├── styles/
│   │   ├── EmployeeCard.css       # Card & badge styling
│   │   ├── EmployeeDirectory.css  # Controls & grid layout
│   │   ├── Footer.css             # Footer styling
│   │   ├── Header.css             # Header & metric counters styling
│   │   ├── index.css              # Global variables & theme
│   │   └── Modal.css              # Modal dialogs & form inputs styling
│   ├── App.jsx                    # Root state & event orchestrator
│   └── main.jsx                   # React mounting entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 How to Run the Project

1. Navigate to the `Assign3` folder:
   ```powershell
   cd D:\Frontend_Dev_Task\Assign3
   ```
2. Install dependencies (if needed):
   ```powershell
   npm install
   ```
3. Start development server:
   ```powershell
   npm run dev
   ```
4. Open the browser link (e.g. `http://localhost:3002`) to test all features.

