import React, { useState, useEffect } from 'react';

const parseFrequency = (frequency) => {
  if (!frequency || ['daily', 'weekly', 'monthly'].includes(frequency)) {
    return {
      frequencyType: frequency || 'daily',
      frequencyCount: 1,
      frequencyTypeAlt: 'day',
    };
  }
  const match = frequency.match(/(\d+)\s+times\s+per\s+(\w+)/);
  if (match) {
    return {
      frequencyType: 'custom',
      frequencyCount: Number(match[1]),
      frequencyTypeAlt: match[2],
    };
  }
  return {
    frequencyType: 'daily',
    frequencyCount: 1,
    frequencyTypeAlt: 'day',
  };
};

const HabitForm = ({
  initialValues = {},
  onSubmit,
  submitLabel = "Save Habit",
  onDelete,
}) => {
  const freq = parseFrequency(initialValues.frequency);
  const [formData, setFormData] = useState({
    name: initialValues.name || '',
    frequencyType: freq.frequencyType,
    frequencyCount: freq.frequencyCount,
    frequencyTypeAlt: freq.frequencyTypeAlt,
    type: initialValues.type || 'binary',
    goal: initialValues.goal || '',
    unit: initialValues.unit || '',
    deadline: initialValues.deadline || '',
    color: initialValues.color || '#3b82f6',
  });

  const [isValid, setIsValid] = useState(false); // To track form validity

  useEffect(() => {
    const freq = parseFrequency(initialValues.frequency);
    setFormData((prev) => ({
      ...prev,
      frequencyType: freq.frequencyType,
      frequencyCount: freq.frequencyCount,
      frequencyTypeAlt: freq.frequencyTypeAlt,
    }));
  }, [initialValues]);

  useEffect(() => {
    const isValid = formData.name.trim() !== '' && formData.goal >= 0;
    setIsValid(isValid);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle changes for dropdowns and inputs
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'goal' || name === 'frequencyCount'
        ? value === '' ? '' : Number(value)
        : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalFrequency =
      formData.frequencyType === 'custom'
        ? `${formData.frequencyCount} times per ${formData.frequencyTypeAlt}`
        : formData.frequencyType;

    const habitData = {
      ...formData,
      frequency: finalFrequency,
    };

    onSubmit(habitData);

    if (!initialValues.name) {
      setFormData({
        name: '',
        frequencyType: 'daily',
        frequencyCount: 1,
        frequencyTypeAlt: 'day',
        type: 'binary',
        goal: '',
        unit: '',
        deadline: '',
        color: '#3b82f6',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 dark:text-white">
      <div>
        <label className="block mb-1 font-medium">Habit Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded p-2 dark:bg-gray-700 dark:text-white"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Frequency</label>
        <select
          name="frequencyType"
          value={formData.frequencyType}
          onChange={handleChange}
          className="w-full border rounded p-2 dark:bg-gray-700 dark:text-white"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      {formData.frequencyType === 'custom' && (
        <div className="flex items-center space-x-2">
          <input
            type="number"
            name="frequencyCount"
            min="1"
            className="w-20 border rounded p-2 dark:bg-gray-700 dark:text-white"
            value={formData.frequencyCount}
            onChange={handleChange}
            required
          />
          <span>times per</span>
          <select
            name="frequencyTypeAlt"
            value={formData.frequencyTypeAlt}
            onChange={handleChange}
            className="border rounded p-2 dark:bg-gray-700 dark:text-white"
          >
            <option value="day">day</option>
            <option value="week">week</option>
            <option value="month">month</option>
            <option value="year">year</option>
          </select>
        </div>
      )}

      <div>
        <label className="block mb-1 font-medium">Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full border rounded p-2 dark:bg-gray-700 dark:text-white"
        >
          <option value="binary">Done / Not done</option>
          <option value="measurable">Measurable</option>
        </select>
      </div>

      {formData.type === 'measurable' && (
        <div className="flex space-x-2">
          <input
            type="number"
            name="goal"
            min="0"
            placeholder="Goal"
            className="w-24 border rounded p-2 dark:bg-gray-700 dark:text-white"
            value={formData.goal}
            onChange={handleChange}
            required
          />
          <input
            name="unit"
            placeholder="Unit"
            className="flex-1 border rounded p-2 dark:bg-gray-700 dark:text-white"
            value={formData.unit}
            onChange={handleChange}
            required
          />
        </div>
      )}

      <div>
        <label className="block mb-1 font-medium">Deadline (optional)</label>
        <input
          type="date"
          name="deadline"
          className="w-full border rounded p-2 dark:bg-gray-700 dark:text-white"
          value={formData.deadline}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Color</label>
        <input
          type="color"
          name="color"
          className="w-12 h-12 p-0 border-none cursor-pointer"
          value={formData.color}
          onChange={handleChange}
        />
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ${!isValid ? 'cursor-not-allowed opacity-50' : ''}`}
          disabled={!isValid}
        >
          {submitLabel}
        </button>
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
};

export default HabitForm;
