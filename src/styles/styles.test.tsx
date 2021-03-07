import { render } from '@testing-library/react';
import { GlobalStyles } from './GlobalStyle';

describe('Global Styles', () => {
  test('are correctly generated in the head', () => {
    render(<GlobalStyles />);
    expect(document.getElementsByTagName('head')).toMatchSnapshot();
  });
});
