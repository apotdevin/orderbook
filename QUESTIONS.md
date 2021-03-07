# Questions

1. What would you add to your solution if you had more time?

   - Fully optimize for different browsers. Checked on Chrome, Firefox and Edge and it looks and works as expected. Checked on Internet Explorer and Safari and the UI styling is not as expected but still works correctly.
   - Further optimize the orderbook table. This table is intensively rerendering to keep up with the data changes and can be further optimized like by memoizing parts of the table that don't constantly change (for example the table headers).

2. What would you have done differently if you knew this page was going to get thousands of views
   per second vs per week?

   - Check that the server can scale appropriately to handle the amount of requests. Server side caching can be enabled or the server can be put behind cloudflare to further optimize the speed and reliability of the webpage. Being a simple single page application scaling should be straightforward.
   - Double check that the websocket can also handle the increased amount of requests and connections.
   - With thousands of views per second maybe monetize it somehow? 😆

3. What was the most useful feature that was added to the latest version of your chosen language?
   Please include a snippet of code that shows how you've used it.

   - Optional Chaining

   ```js
   // No need to directly check the existance of each part
   const username = date?.user?.info?.[1]?.name || 'Unknown';
   ```

   - Nullish Coalescing

   ```js
   // 'Unknown' only if data.information is invalid. Empty string '' is valid.
   const information = data.information ?? 'Unknown';

   // -1 only if data.status is invalid. 0 is a valid status
   const status = data.status ?? -1;
   ```

   - Type Guards and Assertions

   ```js
   // Check if an object has a specific type and let Typescript know about it from then on.
   const isUser = (user: unknown): asserts user is User => {
       return (user as User).name !== undefined
   }
   ```

   - Typing and Naming Tuples

   ```js
   // Making tuples more readable.
   type entry = [price: number, size: number]
   ```

4. How would you track down a performance issue in production? Have you ever had to do this?

   Going directly to the logs. There are different services that help with tracking performance issues in applications. For example [LogRocket](https://logrocket.com/signup/) can help with monitoring websocket connections. I have used SpeedCurve to monitor an enterprise level application in production and development environments. SpeedCurve helps keep track of different web metrics such as Time to Interactive, Largest Contentful Paint and Speed Index. I have also used [Apollo Studio](https://www.apollographql.com/studio/observe/) to check performance issues for a production GraphQL server.

5. Can you describe common security concerns to consider for a frontend developer?

   These are some security concerns that a frontend developer should consider:

   - Filtering user inputs correctly to avoid untrusted data from reaching a server. Example: SQL injection
   - Correctly authenticating and handling the session for a user. Example: encrypting passwords
   - Cross Site Scripting: When an attacker get's access to your webpage and can hijack your session. Example: Injecting untrusted Javascript from a third party.
   - Access to restricted resources such as endpoints, files or databases. Example: not setting user authorization correctly.
   - Non production configurations. Example: running a server in production with **NODE_ENV=development**
   - Not protecting sensitive data such as passwords or credit cards. These should always be encrypted during storage and transit.
   - Cross site request forgery: when an attacker manages to force your browser to perform a task that the users does not intend in doing.
   - Vulnerable components: using packages/modules/libraries with vulnerabilities
   - Insufficient logging and monitoring: the faster you find a vulnerability or issue in your application the better. This is easier with a significant amount of logging and monitoring.

6. How would you improve the API that you just used?

   - Would be great to get some documentation for the API to see additional features that can be implemented on the client to enrich the users experience.
   - [The Websocket Protocol](https://tools.ietf.org/html/rfc6455#page-37) specifies that there should be a **pong** response if a **ping** is received. Currently this endpoint is not responding to **ping** messages.
   - The first message that is received from the websocket server should be the current state of the orderbook so that the client can populate the orderbook with the current state instead of progressively filling it in as messages are received. This would also solve the issue of different users having different orderbooks.
