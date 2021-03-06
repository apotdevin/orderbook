export const formatCurrency = (x: number) => {
  const fixed = x.toFixed(2);
  return fixed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
