import React from 'react';
import { Menu, Moon } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="flex items-center justify-between bg-white dark:bg-gray-900 shadow p-4">
      <div className="flex items-center space-x-3">
        <button 
          onClick={toggleSidebar} 
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Menu className="h-6 w-6 text-gray-800 dark:text-gray-200" />
        </button>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Habit Tracker</h1>
      </div>

      <button 
        onClick={toggleDarkMode}
        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <Moon className="h-6 w-6 text-gray-800 dark:text-gray-200" />
      </button>
    </header>
  );
};

export default Header;
