### code to check susbscribed socket event

```js
console.log("Active event listeners:------");
for (const eventType in socket._callbacks) {
  if (Object.prototype.hasOwnProperty.call(socket._callbacks, eventType)) {
    console.log(eventType);
  }
}
console.log("--------------------------");
```
