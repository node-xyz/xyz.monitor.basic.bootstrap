let XYZ = require('xyz-core')
let xyzMonitor = require('./../../../xyz.monitor.basic.bootstrap').bootstrap
let fn = require('./../../mock.functions')

var mathMs = new XYZ({
  selfConf: {
    name: 'MathMs',
    host: '127.0.0.1'
  },
  systemConf: { nodes: []}
})

mathMs.bootstrap(xyzMonitor, 7000)

mathMs.register('/math/decimal/mul', fn.mul)
mathMs.register('/math/decimal/neg', fn.neg)
mathMs.register('/math/decimal/sub', fn.sub)

mathMs.register('/math/float/neg', function (payload, XResponse) {
  XResponse.send('ok whassssaaaap')
})

setInterval(() => {
  mathMs.call({servicePath: '/string/up', payload: 'hello'}, (err, body, response) => {
    console.log(err, body)
  })
}, 2000)
