import { render } from '@testing-library/react';
import preloadAll from 'jest-next-dynamic';
import { HomeView } from './home';

describe('Home', () => {
  beforeAll(async () => {
    await preloadAll();
  });

  test('matches snapshot', () => {
    const { asFragment } = render(<HomeView />);
    expect(asFragment()).toMatchSnapshot();
  });
});
