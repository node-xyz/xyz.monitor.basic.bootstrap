let XYZ = require('xyz-core').xyz
let basicMonitorBootstrap = require('./../xyz.monitor.basic.bootstrap')
let fn = require('./../../xyz-core/test/ms/mock.functions')

console.log(basicMonitorBootstrap)
var mathMs = new XYZ({
  selfConf: {
    allowJoin: true,
    name: 'MathMs',
    host: '127.0.0.1',
    port: 3333
  },
  systemConf: { nodes: []}
})

basicMonitorBootstrap.bootstrap(mathMs)

mathMs.register('/math/decimal/mul', fn.mul)
mathMs.register('/math/decimal/neg', fn.neg)
mathMs.register('/math/decimal/sub', fn.sub)

mathMs.register('/math/float/neg', function (payload, XResponse) {
  XResponse.send('ok whassssaaaap')
})
