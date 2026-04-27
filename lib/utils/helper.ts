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

interface PaymentWindowParams {
  now?: Date;
  groupConfig: {
    interestStartDay: number;
    interestEndDay: number;
    principalStartDay: number;
    principalEndDay: number;
  };
}

export const getPaymentWindowStatus = (params: PaymentWindowParams) => {
  if (!params?.groupConfig) {
    return {
      isInterestWindow: false,
      isPrincipalWindow: false,
      currentDay: 0,
    };
  }
  const { now, groupConfig } = params;

  const day = Number(
    new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      timeZone: "Asia/Kolkata",
    }).format(now || new Date()),
  );
  const {
    interestStartDay,
    interestEndDay,
    principalStartDay,
    principalEndDay,
  } = groupConfig;
  return {
    isInterestWindow: day >= interestStartDay && day <= interestEndDay,
    isPrincipalWindow: day >= principalStartDay && day <= principalEndDay,
    currentDay: day,
  };
};

export const calculatePrincipalSavings = (
  rate: number,
  amount: number = 10000,
) => {
  const monthlySaving = (amount * (rate / 100)) / 12;

  return {
    amount: amount,
    monthlySaving: Math.round(monthlySaving),
    rate: rate,
  };
};
