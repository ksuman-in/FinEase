export const getPaymentWindowStatus = () => {
  const day = new Date().getDate();
  return {
    isInterestWindow: day >= 1 && day <= 5,
    isPrincipalWindow: day >= 1 && day <= 10,
    currentDay: day,
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};
