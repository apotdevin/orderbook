import { getCurrentOrders, groupByPrice } from './helper';
import {
  IncomingOrderMocks,
  OrderMocks,
  ResultAskMock,
  ResultMock,
  IncomingOrderWithEmptyMocks,
  ResultWithEmptySizesMock,
  IncomingOrderMocksForGrouping,
  GroupedByTwoFiveMock,
  GroupedByFiveMock,
  GroupedByTenMock,
  GroupedByFiftyMock,
  GroupedByOneHundredMock,
  GroupedByFiftyAsksMock,
  GroupedByFiveAsksMock,
  GroupedByOneHundredAsksMock,
  GroupedByTenAsksMock,
  GroupedByTwoFiveAsksMock,
  ResultNoIncomingMock,
} from './mocks/orders';

describe('getCurrentOrders', () => {
  test('correctly gets bid orders with no incomingOrders', () => {
    const orders = OrderMocks;
    const currentOrders = getCurrentOrders(orders);

    expect(currentOrders).toEqual(ResultNoIncomingMock);
  });
  test('correctly gets bid orders', () => {
    const orders = OrderMocks;
    const incomingOrders = IncomingOrderMocks;

    const currentOrders = getCurrentOrders(orders, incomingOrders);

    expect(currentOrders).toEqual(ResultMock);
  });
  test('correctly gets ask orders', () => {
    const orders = OrderMocks;
    const incomingOrders = IncomingOrderMocks;
    const isAsk = true;

    const currentOrders = getCurrentOrders(orders, incomingOrders, isAsk);

    expect(currentOrders).toEqual(ResultAskMock);
  });
  test('correctly removes orders with zero size', () => {
    const orders = OrderMocks;
    const incomingOrders = IncomingOrderWithEmptyMocks;
    const isAsk = true;

    const currentOrders = getCurrentOrders(orders, incomingOrders, isAsk);

    expect(currentOrders).toEqual(ResultWithEmptySizesMock);
  });
});

describe('groupByPrice', () => {
  describe('bids', () => {
    const isAsk = false;
    test('correctly returns entries if not grouped', () => {
      const group = 0.5;
      const entries = getCurrentOrders(
        [],
        IncomingOrderMocksForGrouping,
        isAsk
      );
      const grouped = groupByPrice(group, entries);

      expect(grouped).toEqual(entries);
    });
    test('correctly returns entries if grouped by 2.5', () => {
      const group = 2.5;
      const entries = getCurrentOrders(
        [],
        IncomingOrderMocksForGrouping,
        isAsk
      );
      const grouped = groupByPrice(group, entries, isAsk);

      expect(grouped).toEqual(GroupedByTwoFiveMock);
    });
    test('correctly returns entries if grouped by 5', () => {
      const group = 5;
      const entries = getCurrentOrders(
        [],
        IncomingOrderMocksForGrouping,
        isAsk
      );
      const grouped = groupByPrice(group, entries, isAsk);

      expect(grouped).toEqual(GroupedByFiveMock);
    });
    test('correctly returns entries if grouped by 10', () => {
      const group = 10;
      const entries = getCurrentOrders(
        [],
        IncomingOrderMocksForGrouping,
        isAsk
      );
      const grouped = groupByPrice(group, entries, isAsk);

      expect(grouped).toEqual(GroupedByTenMock);
    });
    test('correctly returns entries if grouped by 50', () => {
      const group = 50;
      const entries = getCurrentOrders(
        [],
        IncomingOrderMocksForGrouping,
        isAsk
      );
      const grouped = groupByPrice(group, entries, isAsk);

      expect(grouped).toEqual(GroupedByFiftyMock);
    });
    test('correctly returns entries if grouped by 100', () => {
      const group = 100;
      const entries = getCurrentOrders(
        [],
        IncomingOrderMocksForGrouping,
        isAsk
      );
      const grouped = groupByPrice(group, entries, isAsk);

      expect(grouped).toEqual(GroupedByOneHundredMock);
    });
  });

  describe('asks', () => {
    const isAsk = true;
    test('correctly returns entries if not grouped', () => {
      const group = 0.5;
      const entries = getCurrentOrders(
        [],
        IncomingOrderMocksForGrouping,
        isAsk
      );
      const grouped = groupByPrice(group, entries, isAsk);

      expect(grouped).toEqual(entries);
    });
    test('correctly returns entries if grouped by 2.5', () => {
      const group = 2.5;
      const entries = getCurrentOrders(
        [],
        IncomingOrderMocksForGrouping,
        isAsk
      );
      const grouped = groupByPrice(group, entries, isAsk);

      expect(grouped).toEqual(GroupedByTwoFiveAsksMock);
    });
    test('correctly returns entries if grouped by 5', () => {
      const group = 5;
      const entries = getCurrentOrders(
        [],
        IncomingOrderMocksForGrouping,
        isAsk
      );
      const grouped = groupByPrice(group, entries, isAsk);

      expect(grouped).toEqual(GroupedByFiveAsksMock);
    });
    test('correctly returns entries if grouped by 10', () => {
      const group = 10;
      const entries = getCurrentOrders(
        [],
        IncomingOrderMocksForGrouping,
        isAsk
      );
      const grouped = groupByPrice(group, entries, isAsk);

      expect(grouped).toEqual(GroupedByTenAsksMock);
    });
    test('correctly returns entries if grouped by 50', () => {
      const group = 50;
      const entries = getCurrentOrders(
        [],
        IncomingOrderMocksForGrouping,
        isAsk
      );
      const grouped = groupByPrice(group, entries, isAsk);

      expect(grouped).toEqual(GroupedByFiftyAsksMock);
    });
    test('correctly returns entries if grouped by 100', () => {
      const group = 100;
      const entries = getCurrentOrders(
        [],
        IncomingOrderMocksForGrouping,
        isAsk
      );
      const grouped = groupByPrice(group, entries, isAsk);

      expect(grouped).toEqual(GroupedByOneHundredAsksMock);
    });
  });
});
