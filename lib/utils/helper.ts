import { configTimeline } from "@/utils/constant";

const pr = new Intl.PluralRules("en-US", { type: "ordinal" });

const suffixes: Record<Intl.LDMLPluralRule, string> = {
  one: "st",
  two: "nd",
  few: "rd",
  other: "th",
  zero: "th",
  many: "th",
};

export function getOrdinal(n: number) {
  const rule = pr.select(n);
  const suffix = suffixes[rule];
  return `${n}${suffix}`;
}

export const getPaymentWindowStatus = () => {
  const day = new Date().getDate();
  return {
    isInterestWindow:
      day >= configTimeline.INTEREST.start &&
      day <= configTimeline.INTEREST.end,
    isPrincipalWindow:
      day >= configTimeline.PRINCIPAL.start &&
      day <= configTimeline.PRINCIPAL.end,
    currentDay: day,
  };
};
