let fn = require('./../../../../xyz-core/test/ms/mock.functions')
var XYZ = require('xyz-core')

var stringMs = new XYZ({
  selfConf: {
    logLevel: 'debug',
    name: 'stringMs',
    host: '127.0.0.1',
    transport: [{type: 'HTTP', port: 5000}]
  },
  systemConf: {
    nodes: []
  }
})

stringMs.register('/string/down', fn.down)
stringMs.register('/string/up', fn.up)
stringMs.register('/finger', fn.finger)

setInterval(() => {
  stringMs.call({servicePath: '/math/decimal/mul', payload: {x: 2, y: 3}}, (err, body, res) => {
    console.log(err, body)
  })
}, 100)
