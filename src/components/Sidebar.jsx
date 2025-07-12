import React from 'react';

const Sidebar = ({ habits, setActivePage, onEditHabit }) => {
  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 flex flex-col h-[calc(100vh-4rem)] fixed top-16 left-0 z-50 sm:static sm:h-auto sm:top-0 sm:z-auto">
      {/* Top section with navigation buttons */}
      <div className="p-4 space-y-2 border-b border-gray-200 dark:border-gray-700">
        <button
          className="w-full text-left py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
          onClick={() => setActivePage('today')}
        >
          Today
        </button>
        <button
          className="w-full text-left py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
          onClick={() => setActivePage('add')}
        >
          Add Habit
        </button>
        <button
          className="w-full text-left py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
          onClick={() => setActivePage('statistics')}
        >
          Statistics
        </button>
        <button
          className="w-full text-left py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
          onClick={() => setActivePage('history')}
        >
          View History
        </button>
      </div>

      {/* Habit List Section */}
      <div className="mt-4 p-4 space-y-2 overflow-y-auto flex-1">
        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Your habits:</h3>

        {habits.length === 0 && (
          <p className="text-gray-400 dark:text-gray-500 text-sm">Your habits will show here once added.</p>
        )}

        {habits.map((habit, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: habit.color }}
              ></span>
              <div className="flex flex-col">
                <span className="font-medium dark:text-white">{habit.name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{habit.frequency}</span>
              </div>
            </div>
            <span
              className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 cursor-pointer"
              onClick={() => onEditHabit(habit, idx)}
            >
              ✏️
            </span>
          </div>
        ))}
      </div>

      {/* Optional: Bottom border to make sure the sidebar has a clean separation */}
      <div className="border-t border-gray-200 dark:border-gray-700"></div>
    </div>
  );
};

export default Sidebar;
