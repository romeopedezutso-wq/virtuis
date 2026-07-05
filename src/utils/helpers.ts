export const generateReferralCode = (email: string): string => {
  const timestamp = Date.now().toString(36);
  const emailHash = email.substring(0, 3).toUpperCase();
  return `${emailHash}${timestamp}`.substring(0, 8).toUpperCase();
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
  }).format(amount);
};

export const formatDate = (date: Date | string): string => {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};
