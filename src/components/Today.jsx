import React from 'react';

const Today = ({ habits, setHabits }) => {
  const today = new Date().toISOString().slice(0, 10);

  const handleCompletionChange = (index, value) => {
    setHabits(prev => {
      const updated = [...prev];
      if (!updated[index].completionHistory) {
        updated[index].completionHistory = {};
      }
      updated[index].completionHistory[today] = value;
      return updated;
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-8">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Today’s Habits</h1>
      {habits.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
          You don't have any habits yet. Start by adding one to track it here!
        </div>
      ) : (
        <div className="space-y-4">
          {habits.map((habit, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow dark:shadow-md transition-colors"
            >
              <span
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: habit.color }}
              ></span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold dark:text-white truncate">{habit.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {habit.frequency}
                </div>
              </div>

              {habit.type === "binary" ? (
                <input
                  type="checkbox"
                  checked={
                    habit.completionHistory &&
                    habit.completionHistory[today] === true
                  }
                  onChange={(e) =>
                    handleCompletionChange(idx, e.target.checked)
                  }
                  className="w-6 h-6 accent-blue-500"
                />
              ) : (
                <input
                  type="number"
                  min="0"
                  className="w-24 border rounded p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={
                    (habit.completionHistory &&
                      habit.completionHistory[today]) || ''
                  }
                  onChange={(e) =>
                    handleCompletionChange(idx, Number(e.target.value))
                  }
                  placeholder={`Goal: ${habit.goal} ${habit.unit}`}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Today;
