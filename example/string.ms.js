let fn = require('./../../xyz-core/test/ms/mock.functions')
var XYZ = require('xyz-core')
let sndToAll = require('xyz.service.send.to.all')

var stringMs = new XYZ({
  selfConf: {
    logLevel: 'debug',
    seed: ['127.0.0.1:3333'],
    name: 'stringMs',
    host: '127.0.0.1',
    port: 3334
  },
  systemConf: {
    nodes: []
  }
})

stringMs.register('/string/down', fn.down)
stringMs.register('/string/up', fn.up)
stringMs.register('/finger', fn.finger)

setInterval(() => {
  stringMs.call({servicePath: '/math/decimal/*', payload: { x: 1000000, y: new Date().getTime() }}, (err, body, res) => {
    console.error('response of decimal/*', body)
  })
}, 3000)

setInterval(() => {
  stringMs.call({servicePath: '/math/decimal/mul', payload: {x: 2, y: 3}}, (err, body, res) => {
    console.log(err, body)
  }, sndToAll)
}, 100)
