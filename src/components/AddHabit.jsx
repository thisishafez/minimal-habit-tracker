import HabitForm from './HabitForm';

const AddHabit = ({ onAddHabit }) => {
  const defaultValues = {
    name: '',
    frequency: 'daily', // Add a default value for frequency here
    type: 'binary',
    goal: '',
    unit: '',
    deadline: '',
    color: '#3b82f6',
  };

  return (
    <div className="dark:text-white">
      <h2>Add New Habit</h2>
      <HabitForm onSubmit={onAddHabit} submitLabel="Add Habit" initialValues={defaultValues} />
    </div>
  );
};

export default AddHabit;
