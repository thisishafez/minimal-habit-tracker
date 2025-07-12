import React, { useState, useMemo } from 'react';
import StatCard from './StatCard';

const timeframes = {
  week: 7,
  month: 30,
  year: 365,
};

const getDates = (count) => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    dates.push(date.toISOString().slice(0, 10));
  }
  return dates.reverse();
};

const Statistics = ({ habits }) => {
  const [timeframe, setTimeframe] = useState('month');
  const dates = useMemo(() => getDates(timeframes[timeframe]), [timeframe]);

  // Calculate stats per habit
  const stats = useMemo(() => {
    return habits.map((habit) => {
      const completionHistory = habit.completionHistory || {};
      let totalDone = 0;
      let daysTracked = 0;
      let longestStreak = 0;
      let currentStreak = 0;

      for (const date of dates) {
        const val = completionHistory[date];
        if (val !== undefined) {
          daysTracked++;
          const done = habit.type === 'binary' ? val === true : (val || 0) >= habit.goal;
          if (done) {
            totalDone += habit.type === 'binary' ? 1 : (val || 0);
            currentStreak++;
            if (currentStreak > longestStreak) longestStreak = currentStreak;
          } else {
            currentStreak = 0;
          }
        } else {
          currentStreak = 0;
        }
      }

      const completionRatePercent = daysTracked === 0 ? 0 : habit.type === 'binary' 
        ? (totalDone / daysTracked) * 100 
        : Math.min(100, (totalDone / (habit.goal * daysTracked)) * 100);

      return {
        habit,
        completionRate: completionRatePercent.toFixed(1),
        totalDone,
        longestStreak,
      };
    });
  }, [habits, dates]);

  const progressData = useMemo(() => {
    return habits.map(habit => {
      const completionHistory = habit.completionHistory || {};
      const data = dates.map(date => {
        if (completionHistory[date] !== undefined) {
          return habit.type === 'binary' ? completionHistory[date] ? 1 : 0
            : Math.min(1, (completionHistory[date] || 0) / habit.goal);
        }
        return 0;
      });
      return { habit, data };
    });
  }, [habits, dates]);

  return (
    <div className="max-w-4xl mx-auto p-6 dark:bg-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Habit Statistics</h1>

      <div className="mb-6 flex items-center justify-between">
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="border rounded px-3 py-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      {habits.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">Add some habits to see statistics here.</p>
      ) : (
        stats.map(({ habit, completionRate, totalDone, longestStreak }, idx) => (
          <StatCard
            key={idx}
            habit={habit}
            completionRate={completionRate}
            totalDone={totalDone}
            longestStreak={longestStreak}
            chartData={progressData[idx].data}
          />
        ))
      )}
    </div>
  );
};

export default Statistics;
