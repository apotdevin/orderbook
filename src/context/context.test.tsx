import { renderHook } from '@testing-library/react-hooks';
import { getStep, useContextDispatch, useContextState } from './context';

describe('context', () => {
  describe('useContextState', () => {
    test('outside of provider', () => {
      const { result } = renderHook(() => useContextState());

      expect(result.error?.message).toBe(
        'useContextState must be used within a ContextProvider'
      );
    });
  });
  describe('useContextProvider', () => {
    test('outside of provider', () => {
      const { result } = renderHook(() => useContextDispatch());

      expect(result.error?.message).toBe(
        'useContextDispatch must be used within a ContextProvider'
      );
    });
  });

  test('getStep', () => {
    const step = getStep(1);
    expect(step).toEqual(0.5);
    const step2 = getStep(2);
    expect(step2).toEqual(1);
    const step3 = getStep(3);
    expect(step3).toEqual(2.5);
    const step4 = getStep(4);
    expect(step4).toEqual(5);
    const step5 = getStep(5);
    expect(step5).toEqual(10);
    const step6 = getStep(6);
    expect(step6).toEqual(25);
    const step7 = getStep(7);
    expect(step7).toEqual(50);
    const step8 = getStep(8);
    expect(step8).toEqual(100);
    const step9 = getStep(9);
    expect(step9).toEqual(250);
    const step10 = getStep(10);
    expect(step10).toEqual(500);
    const step11 = getStep(11);
    expect(step11).toEqual(1000);
    const step12 = getStep(12);
    expect(step12).toEqual(2500);
    const stepDefault = getStep(13);
    expect(stepDefault).toEqual(0.5);
  });
});
