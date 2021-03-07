import { renderHook } from '@testing-library/react-hooks';
import useWindowDimensions from './useWindowDimensions';

describe('useWindowDimensions', () => {
  test('correctly returns dimensions', () => {
    const { result } = renderHook(() => useWindowDimensions());

    expect(result.current.height).toEqual(768);
    expect(result.current.width).toEqual(1024);
  });
});
