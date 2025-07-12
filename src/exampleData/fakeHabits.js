const fakeHabits = [
  {
    name: "Drink Water",
    color: "#3b82f6", // blue
    type: "measurable",
    goal: 8,
    unit: "glasses",
    frequency: "Daily",
    completionHistory: {
      "2025-07-10": 7,
      "2025-07-09": 8,
      "2025-07-08": 6,
      "2025-07-07": 8,
      "2025-07-06": 4,
      "2025-07-05": 8,
      "2025-07-04": 5,
      "2025-07-03": 8,
      "2025-07-02": 7,
      "2025-07-01": 8,
    },
  },
  {
    name: "Meditate",
    color: "#10b981", // green
    type: "binary",
    goal: 1,
    unit: "session",
    frequency: "Daily",
    completionHistory: {
      "2025-07-10": true,
      "2025-07-09": true,
      "2025-07-08": false,
      "2025-07-07": true,
      "2025-07-06": false,
      "2025-07-05": true,
      "2025-07-04": true,
      "2025-07-03": true,
      "2025-07-02": true,
      "2025-07-01": false,
    },
  },
  {
    name: "Read Books",
    color: "#f97316", // orange
    type: "measurable",
    goal: 30,
    unit: "minutes",
    frequency: "Daily",
    completionHistory: {
      "2025-07-10": 25,
      "2025-07-09": 30,
      "2025-07-08": 15,
      "2025-07-07": 0,
      "2025-07-06": 20,
      "2025-07-05": 30,
      "2025-07-04": 30,
      "2025-07-03": 30,
      "2025-07-02": 10,
      "2025-07-01": 30,
    },
  },
  {
    name: "Exercise",
    color: "#ef4444", // red
    type: "binary",
    goal: 1,
    unit: "session",
    frequency: "Daily",
    completionHistory: {
      "2025-07-10": true,
      "2025-07-09": false,
      "2025-07-08": true,
      "2025-07-07": false,
      "2025-07-06": true,
      "2025-07-05": true,
      "2025-07-04": false,
      "2025-07-03": true,
      "2025-07-02": false,
      "2025-07-01": true,
    },
  },
];

export default fakeHabits;
