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
  const sexFactor = sex === 0 ? 0.95 : 1.05; // sex => {0: male 1: female}
  const socialDistanceFactor =
    socialDistance === 0 ? 0.75 : socialDistance === 1 ? 0.5 : 1.25; // socialDistance ?
  const maskFactor = mask === 0 ? 0.95 : mask === 1 ? 0.98 : 1.1; // mask => {0: certified, 1: uncertified, 2: no}
  const cityFactor = bigCity ? 1.5 : 1; // bigCity ?
  const infectedContactFactor = infectedContact // infectedMask ? (mask) ?
    ? infectedMask
      ? mask
        ? 1.015
        : 1.05
      : mask
      ? 1.7
      : 1.9
    : 1;
  const houseMembersFactor = houseMembers + 1; // houseMembers
  const sickHouseMemberFactor = sickHouseMember ? 18 : 1; // sickHouseMember ?
  const sanitizerFactor = sanitizer ? 0.95 : 1.1; // sanitizer ?

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
