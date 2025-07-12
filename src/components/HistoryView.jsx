import React, { useState, useRef, useEffect } from 'react';
import {describeArc } from '../utils/historyHelpers';

const HistoryView = ({ habits }) => {
  const [timeframe, setTimeframe] = useState('month');
  const [tooltipData, setTooltipData] = useState({ show: false, content: '' });
  const tooltipRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Track window resize to update isMobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getDates = () => {
    const dates = [];
    const today = new Date();
    let count = 30;
    if (timeframe === 'week') count = 7;
    if (timeframe === 'year') count = 365;
    if (timeframe === 'day') count = 1;

    for (let i = 0; i < count; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      dates.push(date.toISOString().slice(0, 10));
    }
    return dates.reverse();
  };

  const computeSlices = (date) => {
    if (!habits.length) return [];
    const total = habits.length;
    const anglePer = (2 * Math.PI) / total;
    let angle = -Math.PI / 2;

    return habits.map(habit => {
      let percent = 0;
      const value = habit.completionHistory?.[date];
      if (habit.type === "binary") {
        percent = value ? 1 : 0;
      } else {
        percent = Math.min((value || 0) / habit.goal, 1);
      }

      const slice = {
        startAngle: angle,
        endAngle: angle + anglePer * percent,
        fullAngle: angle + anglePer,
        color: habit.color,
        habit
      };
      angle += anglePer;
      return slice;
    });
  };

  const computeTooltip = (date) => {
    const lines = [`${date}`];
    for (let habit of habits) {
      let status = "Not done";
      if (habit.completionHistory?.[date] !== undefined) {
        if (habit.type === "binary") {
          status = habit.completionHistory[date] ? "Done" : "Not done";
        } else {
          const value = habit.completionHistory[date];
          status = `${value}/${habit.goal} ${habit.unit}`;
        }
      }
      lines.push(`${habit.name}: ${status}`);
    }
    return lines.join('\n');
  };

  const showTooltip = (content) => {
    setTooltipData({
      show: true,
      content
    });
  };

  const hideTooltip = () => {
    setTooltipData(prev => ({ ...prev, show: false }));
  };

  const handleMouseEnter = (e, content) => {
    if (!isMobile) {
      showTooltip(content); // Show the tooltip on hover
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      hideTooltip(); // Hide the tooltip on mouse leave
    }
  };

  const handleClickMobile = (e, content) => {
    e.stopPropagation(); // prevent outside click from immediately firing
    const alreadyVisible = tooltipData.show && tooltipData.content === content;
    if (alreadyVisible) {
      hideTooltip(); // Hide if already visible
    } else {
      showTooltip(content); // Show new tooltip on mobile click
    }
  };

  // Hide mobile tooltip on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        tooltipData.show &&
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target)
      ) {
        hideTooltip(); // Hide tooltip when clicking outside
      }
    };

    if (isMobile) {
      window.addEventListener('click', handleOutsideClick);
      return () => window.removeEventListener('click', handleOutsideClick);
    }
  }, [tooltipData.show, isMobile]);

  return (
    <div className="relative max-w-5xl mx-auto p-4 sm:p-8">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Habit History</h1>

      <div className="mb-6">
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="border rounded px-3 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600"
        >
          <option value="day">Today</option>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      <div className="grid grid-cols-7 gap-2 sm:gap-5">
        {getDates().map(date => {
          const slices = computeSlices(date);
          const tooltip = computeTooltip(date);

          return (
            <div
              key={date}
              className="relative"
              onMouseEnter={(e) => handleMouseEnter(e, tooltip)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleClickMobile(e, tooltip)}
            >
              <svg
                viewBox="0 0 100 100"
                className="rounded-full shadow hover:scale-110 transition-transform"
                style={{
                  width: 'clamp(30px, 12vw, 80px)',
                  height: 'clamp(30px, 12vw, 80px)',
                  background: 'transparent'
                }}
              >
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="white"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                  className="dark:fill-gray-800 dark:stroke-gray-600"
                />
                {slices.map((slice, idx) => (
                  <path
                    key={idx}
                    d={describeArc(50, 50, 48, slice.startAngle, slice.endAngle)}
                    fill={slice.color}
                    stroke="white"
                    strokeWidth="2"
                  />
                ))}
                {slices.map((slice, idx) => (
                  <path
                    key={`remain-${idx}`}
                    d={describeArc(50, 50, 48, slice.endAngle, slice.fullAngle)}
                    fill="transparent"
                    stroke="white"
                    strokeWidth="2"
                  />
                ))}
              </svg>
            </div>
          );
        })}
      </div>

      {tooltipData.show && (
        <div
          ref={tooltipRef}
          className="fixed bg-white border border-gray-300 shadow-lg rounded p-2 text-sm whitespace-pre-line z-50 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          onMouseEnter={() => {}} // Keep tooltip visible when hovered
          onMouseLeave={hideTooltip} // Hide tooltip when mouse leaves
          style={{
            bottom: 20,  // Position the tooltip 20px from the bottom of the screen
            right: 20,   // Position the tooltip 20px from the right edge of the screen
            transform: 'translate(0, 0)',
            maxWidth: '80%'
          }}
        >
          {tooltipData.content}
        </div>
      )}
    </div>
  );
};

export default HistoryView;
