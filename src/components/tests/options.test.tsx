import { fireEvent, render } from '@testing-library/react';
import { ContextProvider } from 'src/context/context';
import { screen } from '@testing-library/dom';
import { Options } from '../options';

describe('Options', () => {
  test('matches snapshot', () => {
    const { asFragment } = render(
      <ContextProvider>
        <Options spread={20} price={200} />
      </ContextProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('shows spread and percent', () => {
    render(
      <ContextProvider>
        <Options spread={20} price={200} />
      </ContextProvider>
    );

    expect(screen.getByText('20 Spread (10.00%)')).toBeDefined();
  });

  test('change group', () => {
    render(
      <ContextProvider>
        <Options spread={20} price={200} />
      </ContextProvider>
    );

    fireEvent(
      screen.getByTestId('increaseChangeGroup'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(screen.getByText('Group: 1')).toBeDefined();

    fireEvent(
      screen.getByTestId('decreaseChangeGroup'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(screen.getByText('Group: 0.5')).toBeDefined();
  });

  test('change limit', () => {
    render(
      <ContextProvider>
        <Options spread={20} price={200} />
      </ContextProvider>
    );

    fireEvent(
      screen.getByTestId('increaseChangeLimit'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(screen.getByText('Limit: 20')).toBeDefined();

    fireEvent(
      screen.getByTestId('decreaseChangeLimit'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(screen.getByText('Limit: 15')).toBeDefined();
  });
});
