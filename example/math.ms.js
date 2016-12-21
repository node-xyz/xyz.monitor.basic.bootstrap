let XYZ = require('xyz-core').xyz
let xyzMonitor = require('./../xyz.monitor.basic.bootstrap')
let fn = require('./../../xyz-core/test/ms/mock.functions')

var mathMs = new XYZ({
  selfConf: {
    defaultSendStrategy: 'xyz.service.send.to.all',
    allowJoin: true,
    name: 'MathMs',
    host: '127.0.0.1',
    port: 3333
  },
  systemConf: { nodes: []}
})

xyzMonitor.bootstrap(mathMs, 7000)

mathMs.register('/math/decimal/mul', fn.mul)
mathMs.register('/math/decimal/neg', fn.neg)
mathMs.register('/math/decimal/sub', fn.sub)

mathMs.register('/math/float/neg', function (payload, XResponse) {
  XResponse.send('ok whassssaaaap')
})

setInterval(() => {
  mathMs.call('/string/up', 'hello', (err, body, response) => {
    console.log(err, body)
  })
}, 2000)
