export function calculateRisk(
  currentCases,
  population,
  sex,
  socialDistance,
  mask,
  bigCity,
  infectedContact,
  infectedMask,
  houseMembers,
  sickHouseMember,
  sanitizer
) {
  const sexFactor = sex ? 0.95 : 1.05; // sex => {0: male 1: female}
  const socialDistanceFactor =
    socialDistance === 0 ? 1.25 : socialDistance === 1 ? 0.75 : 0.5; // socialDistance
  const maskFactor = mask === 0 ? 1.1 : mask === 1 ? 0.98 : 0.95;
  const cityFactor = bigCity ? 1.5 : 1;
  const infectedContactFactor = infectedContact
    ? infectedMask
      ? mask
        ? 1.015
        : 1.05
      : mask
      ? 1.7
      : 1.9
    : 1;
  const houseMembersFactor = houseMembers + 1;
  const sickHouseMemberFactor = sickHouseMember ? 18 : 1;
  const sanitizerFactor = sanitizer ? 0.95 : 1.1;

  const riskFactor =
    (currentCases / population) *
    socialDistanceFactor *
    sexFactor *
    maskFactor *
    cityFactor *
    infectedContactFactor *
    houseMembersFactor *
    sickHouseMemberFactor *
    sanitizerFactor;

  return riskFactor;
}
