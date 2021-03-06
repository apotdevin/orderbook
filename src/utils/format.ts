export const formatCurrency = (x: number, fixedNumbers = 2) => {
  const fixed = x.toFixed(fixedNumbers);
  return fixed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
