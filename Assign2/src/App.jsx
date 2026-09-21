import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import StudentList from './components/StudentList';
import Footer from './components/Footer';
import { initialStudents } from './data/studentsData';
import './styles/index.css';

/**
 * Main App Component
 * Serves as the central data orchestrator for Assignment 2:
 * 1. Manages student state and sorting state.
 * 2. Implements sorting by CGPA (Descending, Ascending, Default).
 * 3. Demonstrates pure Props passing to Header, StudentList, and Footer.
 */
function App() {
  const [students, setStudents] = useState(initialStudents);
  const [sortOrder, setSortOrder] = useState('default'); // 'desc' | 'asc' | 'default'
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Extract unique departments for filtering props
  const departments = useMemo(() => {
    return Array.from(new Set(initialStudents.map((s) => s.department)));
  }, []);

  // Compute filtered & sorted students based on props/state
  const processedStudents = useMemo(() => {
    // 1. Filter by Department
    let list = students.filter((student) => {
      if (selectedDept !== 'All' && student.department !== selectedDept) {
        return false;
      }
      // 2. Filter by Search Query
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchesName = student.name.toLowerCase().includes(query);
        const matchesRoll = student.rollNumber.toLowerCase().includes(query);
        return matchesName || matchesRoll;
      }
      return true;
    });

    // 3. Sort by CGPA Mechanism
    if (sortOrder === 'desc') {
      return [...list].sort((a, b) => b.cgpa - a.cgpa);
    } else if (sortOrder === 'asc') {
      return [...list].sort((a, b) => a.cgpa - b.cgpa);
    }

    // Default sort by initial student ID
    return [...list].sort((a, b) => a.id - b.id);
  }, [students, sortOrder, selectedDept, searchTerm]);

  // Compute portal metrics to pass down as props
  const stats = useMemo(() => {
    const total = students.length;
    if (total === 0) return { total: 0, top: 0, avg: 0 };
    const top = Math.max(...students.map((s) => s.cgpa));
    const avg = students.reduce((acc, curr) => acc + curr.cgpa, 0) / total;
    return {
      total,
      top,
      avg
    };
  }, [students]);

  // Handler for sorting mechanism passed as prop
  const handleSortChange = (newOrder) => {
    setSortOrder(newOrder);
  };

  // Handler for department filter passed as prop
  const handleDeptChange = (newDept) => {
    setSelectedDept(newDept);
  };

  // Handler for search term passed as prop
  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="app-container">
      {/* Passing Header data strictly via Props */}
      <Header
        title="Student Information Portal"
        subtitle="Comprehensive student academic management system with live CGPA sorting and profile cards."
        institution="National Institute of Technology"
        totalStudents={stats.total}
        topCgpa={stats.top}
        avgCgpa={stats.avg}
      />

      <main className="main-content">
        {/* Passing student records, sorting state, and handlers via Props */}
        <StudentList
          students={processedStudents}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
          selectedDept={selectedDept}
          onDeptChange={handleDeptChange}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          departments={departments}
        />
      </main>

      {/* Passing Footer metadata strictly via Props */}
      <Footer
        portalName="Student Academic Management Portal"
        institution="National Institute of Technology"
        academicYear="2026-2027"
        courseCode="Assignment 2: Props & Data Passing"
      />
    </div>
  );
}

export default App;

