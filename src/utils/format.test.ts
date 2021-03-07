import { formatCurrency } from './format';

describe('formatCurrency', () => {
  test('correctly formats hundreds', () => {
    const formatted = formatCurrency(100);
    expect(formatted).toEqual('100.00');
  });
  test('correctly formats thousands', () => {
    const formatted = formatCurrency(1000);
    expect(formatted).toEqual('1,000.00');
  });
  test('correctly formats millions', () => {
    const formatted = formatCurrency(1000000);
    expect(formatted).toEqual('1,000,000.00');
  });
  test('correctly formats 1 decimal', () => {
    const formatted = formatCurrency(1000000, 1);
    expect(formatted).toEqual('1,000,000.0');
  });
  test('correctly formats 0 decimals', () => {
    const formatted = formatCurrency(1000000, 0);
    expect(formatted).toEqual('1,000,000');
  });
});
