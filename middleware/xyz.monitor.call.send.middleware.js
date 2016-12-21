let count = 0
let interval = 5000
let monitor

setInterval(() => {
  // this is because when this module is being initialized, the monitor module itself is empty!
  // TODO think of a better way for communication between middlewares and bootstrap functions
  if (monitor === undefined) monitor = require('./../xyz.monitor.basic.bootstrap')
  monitor.setSendLoad(count / (interval / 1000))
  count = 0
}, interval)

function callSendMonitor (param, next, end) {
  count += 1
  next()
}

module.exports = callSendMonitor
