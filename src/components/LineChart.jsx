import React from 'react';

export const LineChart = ({ data, color }) => {
  const width = 200;
  const height = 60;
  const padding = 20;

  if (data.length === 0) return null;

  const stepX = (width - 2 * padding) / (data.length - 1);

  const points = data.map((val, i) => {
    const x = padding + i * stepX;
    const y = height - padding - val * (height - 2 * padding);
    return [x, y];
  });

  const pathD = points.reduce((acc, [x, y], i) => {
    return acc + (i === 0 ? `M${x},${y}` : ` L${x},${y}`);
  }, '');

  return (
    <svg width={width} height={height}>
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3} fill={color} />
      ))}
    </svg>
  );
};
