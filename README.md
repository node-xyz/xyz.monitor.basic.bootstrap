# xyz.monitor.basic.bootstrap

[![Build Status](https://travis-ci.org/node-xyz/xyz.monitor.basic.bootstrap.svg?branch=master)](https://travis-ci.org/node-xyz/xyz.monitor.basic.bootstrap) [![npm version](https://badge.fury.io/js/xyz.monitor.basic.bootstrap.svg)](https://badge.fury.io/js/xyz.monitor.basic.bootstrap)

---
This project has been created as a means for demonstrating the usage of bootstrap functions. [This section of the documentations](https://node-xyz.github.io/documentations/advance/bootstrap-functions/) will describe how this bootstrap function work in depth.

## Usage

Install the bootstrap function using

```bash
npm install xyz.monitor.basic.bootstrap
```

patch it to the system using:

```javascript
let ms = new XYZ({...})
const port = 7777
ms.bootstrap(require('xyz.monitor.basic.bootstrap'), port)
```

This will automatically create a new HTTP server (using express) on port 7777 and the information of the system will be displayed there.

Note that this bootstrap function will monitor the default `CALL` route by default.

### Example output

![](https://node-xyz.github.io/assets/img/monitor.example.png)


#### Tests

Test are located in `test` directory and demonstrate different usages of this bootstrap plugin. All of them will be lunched using:

```
npm test
```
