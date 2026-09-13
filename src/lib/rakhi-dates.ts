// Known Raksha Bandhan (Shravana Purnima) Gregorian dates.
// Sourced from Drik Panchang / Festive Dates / Lagna360 listings.
// When the last known date passes, the helper falls back to an
// approximate lunar estimate so the countdown keeps working.
export const RAKHI_DATES: { year: number; month: number; day: number }[] = [
  { year: 2024, month: 7, day: 19 }, // Aug 19, 2024
  { year: 2025, month: 7, day: 9 }, // Aug 9, 2025
  { year: 2026, month: 7, day: 28 }, // Aug 28, 2026
  { year: 2027, month: 7, day: 17 }, // Aug 17, 2027
  { year: 2028, month: 7, day: 5 }, // Aug 5, 2028
  { year: 2029, month: 7, day: 23 }, // Aug 23, 2029
  { year: 2030, month: 7, day: 13 }, // Aug 13, 2030
  { year: 2031, month: 7, day: 2 }, // Aug 2, 2031
  { year: 2032, month: 7, day: 20 }, // Aug 20, 2032
  { year: 2033, month: 7, day: 10 }, // Aug 10, 2033
  { year: 2034, month: 7, day: 30 }, // Aug 30, 2034 (approx)
  { year: 2035, month: 7, day: 19 }, // Aug 19, 2035 (approx)
];

export type RakhiTarget = {
  date: Date; // local midnight of the festival day
  year: number;
  dateLabel: string; // localized "17 August 2027"
  isToday: boolean; // true during the festival day
};

const LOCALE_MAP: Record<string, string> = {
  en: "en-GB",
  hi: "hi-IN",
  mr: "mr-IN",
  gu: "gu-IN",
  ta: "ta-IN",
};

const endOfDay = (d: Date) => {
  const e = new Date(d);
  e.setHours(23, 59, 59, 999);
  return e;
};

// Approximate fallback for years beyond our known list.
// Rakhi is Shravana Purnima — drifts ~10-11 days earlier per Gregorian year.
const approxDate = (year: number) => {
  const last = RAKHI_DATES[RAKHI_DATES.length - 1];
  let { year: y, month, day } = last;
  while (y < year) {
    day -= 11;
    while (day < 1) {
      month -= 1;
      if (month < 0) {
        month = 11;
        y += 1;
      }
      // days in previous month
      day += new Date(y, month + 1, 0).getDate();
    }
    y += 1;
  }
  return new Date(year, month, day);
};

export const getNextRakhi = (
  now: number = Date.now(),
  lang: string = "en"
): RakhiTarget => {
  let chosen: Date | null = null;
  for (const { year, month, day } of RAKHI_DATES) {
    const d = new Date(year, month, day, 0, 0, 0, 0);
    if (endOfDay(d).getTime() > now) {
      chosen = d;
      break;
    }
  }
  if (!chosen) chosen = approxDate(new Date(now).getFullYear() + 1);

  const locale = LOCALE_MAP[lang] ?? "en-GB";
  const dateLabel = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(chosen);

  const isToday =
    now >= chosen.getTime() && now <= endOfDay(chosen).getTime();

  return { date: chosen, year: chosen.getFullYear(), dateLabel, isToday };
};
