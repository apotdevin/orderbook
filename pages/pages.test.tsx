import { render } from '@testing-library/react';
import preloadAll from 'jest-next-dynamic';
import HomeView from './index';

describe('Pages', () => {
  beforeAll(async () => {
    await preloadAll();
  });

  test('index page matches snapshot', () => {
    const { asFragment } = render(<HomeView />);
    expect(asFragment()).toMatchSnapshot();
  });
});
