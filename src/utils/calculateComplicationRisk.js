//This function calculates the risk score based on the user's health data, such as blood pressure and glucose levels
export const calculateComplicationRisk = (healthData) => {
  const { bloodPressure, glucoseLevels } = healthData;
  let risk = 0;

  if (bloodPressure > 140) risk += 20;
  if (glucoseLevels > 180) risk += 30;

  return risk;
};
