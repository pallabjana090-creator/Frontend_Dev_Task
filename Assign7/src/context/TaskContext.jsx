import React, { createContext, useContext, useState } from 'react';

/**
 * TaskContext (Integrated from Assignment 6)
 * Supplies task management capabilities to the authenticated portal
 */
const TaskContext = createContext(null);

const initialTasks = [
  {
    id: 'tsk-101',
    title: 'Product Architecture Review',
    description: 'Review microservice boundaries, caching strategies, and latency benchmarks for Q3 release.',
    priority: 'High',
    category: 'Work',
    due: '28 Aug 2026',
    status: 'Pending',
    createdAt: '2026-08-15'
  },
  {
    id: 'tsk-102',
    title: 'Laboratory Chemistry Report',
    description: 'Compile spectroscopic titration results and write conclusion for organic chemistry lab module.',
    priority: 'Medium',
    category: 'Study',
    due: '30 Aug 2026',
    status: 'In Progress',
    createdAt: '2026-08-18'
  },
  {
    id: 'tsk-103',
    title: 'Deploy Serverless Microservices',
    description: 'Configure continuous integration pipelines, automated regression suites, and cloud alarms.',
    priority: 'High',
    category: 'Development',
    due: '25 Aug 2026',
    status: 'Completed',
    createdAt: '2026-08-10'
  },
  {
    id: 'tsk-104',
    title: 'Annual Dental & Wellness Checkup',
    description: 'Routine oral prophylaxis appointment and medical insurance policy renewal documentation.',
    priority: 'Low',
    category: 'Health',
    due: '05 Sep 2026',
    status: 'Pending',
    createdAt: '2026-08-20'
  },
  {
    id: 'tsk-105',
    title: 'Rebalance Mutual Funds Portfolio',
    description: 'Review asset allocation across index funds, debt securities, and tax-saving fixed deposits.',
    priority: 'Medium',
    category: 'Finance',
    due: '15 Sep 2026',
    status: 'Pending',
    createdAt: '2026-08-21'
  },
  {
    id: 'tsk-106',
    title: 'Finalize Responsive Frontend UI',
    description: 'Conduct cross-browser visual QA tests on mobile viewports and ensure accessibility compliance.',
    priority: 'High',
    category: 'Development',
    due: '28 Aug 2026',
    status: 'Completed',
    createdAt: '2026-08-12'
  }
];

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(initialTasks);

  const createTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: `tsk-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  };

  const updateTask = (taskId, updatedData) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, ...updatedData } : task))
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const toggleComplete = (taskId) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const nextStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
          return { ...task, status: nextStatus };
        }
        return task;
      })
    );
  };

  const getTaskById = (taskId) => {
    return tasks.find((t) => t.id === taskId);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        updateTask,
        deleteTask,
        toggleComplete,
        getTaskById
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

