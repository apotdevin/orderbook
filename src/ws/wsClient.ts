import WebSocket from 'ws';

export class OrderBookWs {
  ws: WebSocket;

  constructor() {
    console.log('Connecting to websocket...');
    this.ws = new WebSocket('wss://www.cryptofacilities.com/ws/v1');
    console.log('Connected to websocket.');

    this.subToWs();
  }

  subToWs() {
    this.ws.on('open', () => {
      console.log('WEBSOCKET IS OPEN');

      this.ws.send(
        JSON.stringify({
          event: 'subscribe',
          feed: 'book_ui_1',
          product_ids: ['PI_XBTUSD'],
        })
      );
    });

    this.ws.on('message', function incoming() {
      //   console.log('DATAAA', data);
    });
  }
}
