export function calculateRisk_prev(
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
  const sexFactor = sex === 0 ? 0.95 : 1.05; // sex => {0: male, 1: female}
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
  sanitizer,
  contactFreq
) {
  const sexFactor = sex === 0 ? 0 : 1; // sex => {0: male, 1: female}
  const socialDistanceFactor =
    socialDistance === 0 ? 0.1 : socialDistance === 1 ? 0 : 0.15; // socialDistance => {0: >= 1 meter, 1: >= 2 meters, 2: No}
  const maskFactor = mask === 0 ? 0 : mask === 0.02 ? 0 : 0.05; // mask => {0: certified, 1: uncertified, 2: no}
  const cityFactor = bigCity ? 0.05 : 0; // bigCity ?
  const infectedContactFactor = infectedContact // infectedMask ? (mask) ?
    ? infectedMask
      ? mask
        ? 0.02
        : 0.04
      : mask
      ? 0.1
      : 0.15
    : 0;
  const houseMembersFactor = [0, 0.02, 0.03, 0.06][houseMembers]; // houseMembers => {0: None, 1: One, 2: Two, 3: Three or more}
  const sickHouseMemberFactor = sickHouseMember ? 0.15 : 0; // sickHouseMember ?
  const sanitizerFactor = sanitizer ? 0 : 0.05; // sanitizer ?

  const contactFreqFactor = [0, 0.01, 0.025, 0.04][contactFreq]; // contactFreq => {0: Hardly ever, 1: Once a week, 2: 2-3 times a week, 3: >=4 times a week}

  const seasonFactor = (() => {
    const month = new Date(Date.now()).getMonth();
    if (month >= 3 && month <= 8) return 0;
    return 0.05;
  })();

  const riskFactor =
    (currentCases / population) * socialDistanceFactor +
    sexFactor +
    maskFactor +
    cityFactor +
    infectedContactFactor +
    houseMembersFactor +
    sickHouseMemberFactor +
    sanitizerFactor +
    contactFreqFactor +
    seasonFactor;

  return riskFactor;
}
