const windDescriptions = [
  {
    min: 0.0,
    max: 0.2,
    description: "Calm",
    feel: "Smoke rises vertically",
  },
  {
    min: 0.3,
    max: 1.5,
    description: "Light air",
    feel: "Ripples on water",
  },
  {
    min: 1.6,
    max: 3.3,
    description: "Light breeze",
    feel: "Leaves rustle",
  },
  {
    min: 3.4,
    max: 5.4,
    description: "Gentle breeze",
    feel: "Leaves and small twigs in motion",
  },
  {
    min: 5.5,
    max: 7.9,
    description: "Moderate breeze",
    feel: "Dust and paper lifted",
  },
  {
    min: 8.0,
    max: Infinity,
    description: "Strong wind or stronger",
    feel: "Branches move, walking is harder",
  },
];

export const getWindDescription = (speed: number) => {
  return (
    windDescriptions.find((range) => speed >= range.min && speed <= range.max) || {
      min: 0,
      max: 0,
      description: "Unknown",
      feel: "No wind info available",
    }
  );
};
