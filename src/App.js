import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AddHabit from './components/AddHabit';
import EditHabit from './components/EditHabit';
import Today from './components/Today';
import HistoryView from './components/HistoryView';
import Statistics from './components/Statistics';
import fakeHabits from './exampleData/fakeHabits';

function App() {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('habits');
    return saved ? JSON.parse(saved) : fakeHabits; // Default to fake data if none saved
  });

  const [sidebarVisible, setSidebarVisible] = useState(window.innerWidth >= 768);
  const [activePage, setActivePage] = useState('home');
  const [habitToEdit, setHabitToEdit] = useState(null);
  
  // Ref for sidebar container
  const sidebarRef = useRef(null);

  // Update localStorage whenever habits state changes
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  // Handle adding, updating, and deleting habits
  const handleAddHabit = (newHabit) => {
    setHabits(prev => [...prev, newHabit]);
    setActivePage('home');
  };

  const handleUpdateHabit = (updatedHabit, index) => {
    const updatedHabits = [...habits];
    updatedHabits[index] = updatedHabit;
    setHabits(updatedHabits);
    setActivePage('home');
    setHabitToEdit(null);
  };

  const handleDeleteHabit = (index) => {
    const updatedHabits = habits.filter((_, i) => i !== index);
    setHabits(updatedHabits);
    setActivePage('home');
    setHabitToEdit(null);
  };

  // Close sidebar when clicking outside of it, excluding the header
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarVisible && sidebarRef.current && !sidebarRef.current.contains(event.target) && !event.target.closest('header')) {
        setSidebarVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarVisible]);

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-800 dark:text-white">
      <Header toggleSidebar={() => setSidebarVisible(!sidebarVisible)} />
      <div className="flex flex-1">
        {sidebarVisible && (
          <div ref={sidebarRef} className="h-screen"> {/* Sidebar height set to 100vh */}
            <Sidebar
              habits={habits}
              isVisible={sidebarVisible}
              setActivePage={setActivePage}
              onEditHabit={(habit, index) => {
                setHabitToEdit({ ...habit, index });
                setActivePage('edit');
              }}
            />
          </div>
        )}
        <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">
          {activePage === 'home' && (
            <div>
              <h1 className="text-2xl font-bold mb-4">Welcome to your Habit Tracker</h1>
              <p className="text-gray-600 dark:text-gray-400">Select an option from the sidebar to begin.</p>
            </div>
          )}
          {activePage === 'add' && (
            <AddHabit onAddHabit={handleAddHabit} />
          )}
          {activePage === 'edit' && habitToEdit && (
            <EditHabit
              habit={habitToEdit}
              onUpdateHabit={handleUpdateHabit}
              onDeleteHabit={handleDeleteHabit}
            />
          )}
          {activePage === 'today' && (
            <Today habits={habits} setHabits={setHabits} />
          )}
          {activePage === 'history' && (
            <HistoryView habits={habits} />
          )}
          {activePage === 'statistics' && (
            <Statistics habits={habits} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
