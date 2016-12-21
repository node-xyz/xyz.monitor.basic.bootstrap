let express = require('express')
let monitorCallReceive = require('./middleware/xyz.monitor.call.receive.middleware')
let monitorCallSend = require('./middleware/xyz.monitor.call.send.middleware')
let load = { snd: 0, rcv: 0}
const logger = require('xyz-core').logger

function basicMonitorBootstrap (xyz, port = 5000) {
  /*
  Initialize a simple express server
   */
  var app = express()
  app.get('/', function (req, res) {
    res.json(load)
  })
  app.listen(port, function () {
    logger.info(`monitor server started at port ${port}`)
  })

  /*
  Register required middlewares
   */
  xyz.serviceRepository.transportServer.callReceiveMiddlewareStack.register(0,
    monitorCallReceive)
  xyz.serviceRepository.transportClient.callDispatchMidllewareStack.register(0,
    monitorCallSend)
}

module.exports = {
  bootstrap: basicMonitorBootstrap,
  setSendLoad: (aLoad) => {
    load.snd = aLoad
  },
  setRcvLoad: (aLoad) => {
    load.rcv = aLoad
  }
}
