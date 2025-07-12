import React from 'react';
import { LineChart } from './LineChart';

const StatCard = ({ habit, completionRate, totalDone, longestStreak, chartData }) => (
  <div className="mb-8 p-6 border rounded shadow dark:bg-gray-700 dark:border-gray-600">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <span
          className="w-5 h-5 rounded-full inline-block"
          style={{ backgroundColor: habit.color }}
        />
        <h2 className="text-xl font-semibold">{habit.name}</h2>
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-300">
        Completion Rate: <strong>{completionRate}%</strong>
      </div>
    </div>

    <div className="mb-2 text-gray-700 dark:text-gray-200">
      {habit.type === 'binary' ? (
        <>Total completions: <strong>{totalDone}</strong></>
      ) : (
        <>Total: <strong>{totalDone} {habit.unit}</strong></>
      )}
    </div>

    <div className="mb-4 text-gray-700 dark:text-gray-200">
      Longest streak: <strong>{longestStreak} days</strong>
    </div>

    <LineChart data={chartData} color={habit.color} />
  </div>
);

export default StatCard;
