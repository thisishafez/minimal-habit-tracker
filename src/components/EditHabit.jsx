import { useState } from 'react';
import HabitForm from './HabitForm';

const EditHabit = ({ habit, onUpdateHabit, onDeleteHabit }) => {
  const [confirm, setConfirm] = useState(false);

  return (
    <div className="dark:text-white">
      <h2>Edit Habit</h2>
      <HabitForm
        initialValues={habit}
        onSubmit={(updated) => onUpdateHabit(updated, habit.index)}
        submitLabel="Save Changes"
        onDelete={() => setConfirm(true)}
      />
      {confirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-800 bg-opacity-50 absolute inset-0"></div>
          <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-6 rounded-lg shadow-lg z-10 max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Are you sure you want to delete?</h3>
            <p className="mb-4">This action cannot be undone.</p>
            <div className="flex justify-between space-x-4">
              <button
                onClick={() => setConfirm(false)}
                className="bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-white px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteHabit(habit.index);
                  setConfirm(false);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditHabit;
