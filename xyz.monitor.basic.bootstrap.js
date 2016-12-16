let express = require('express')
let monitorCallReceive = require('./middleware/xyz.monitor.call.receive.middleware')
let load = 0
const logger = require('xyz-core').logger

function basicMonitorBootstrap (xyz, port) {
  var app = express()
  app.get('/', function (req, res) {
    res.json({load: load})
  })
  app.listen(5656, function () {
    logger.info('monitor server started at port 5656')
  })

  xyz.serviceRepository.transportServer.callReceiveMiddlewareStack.register(0,
    monitorCallReceive
  )
}

module.exports = {
  bootstrap: basicMonitorBootstrap,
  setAverageLoad: (aLoad) => {
    load = aLoad
  }
}
