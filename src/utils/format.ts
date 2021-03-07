// Add decimal and comma separators to numbers.
// Example: format 1000 to 1,000.00
export const formatCurrency = (x: number, fixedNumbers = 2) => {
  const fixed = x.toFixed(fixedNumbers);
  return fixed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
