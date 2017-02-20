let express = require('express')
let monitorCallReceive = require('./middleware/xyz.monitor.call.receive.middleware')
let monitorCallSend = require('./middleware/xyz.monitor.call.send.middleware')
let load = { snd: 0, rcv: 0}
let logger

function basicMonitorBootstrap (xyz, port = 5000) {
  /*
  Initialize a simple express server
   */
  logger = xyz.logger
  var app = express()
  app.use(express.static(__dirname + '/lib'))

  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
  })

  app.get('/all', function (req, res) {
    res.json({load: load, inspectJSON: xyz.inspectJSON(), inspect: xyz.inspect()})
  })
  let listener = app.listen(port, function () {
    logger.info(`monitor server started at port ${listener.address().port}`)
  })

  /*
  Register required middlewares
   */
  xyz.middlewares().transport.server('CALL')(xyz.CONFIG.getSelfConf().transport[0].port).register(0,
    monitorCallReceive)
  xyz.middlewares().transport.client('CALL').register(0,
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
