const test = require('./../common').test
const expect = require('chai').expect
const _send = test.sendMessage
const TOTAL = require('./../common').TOTAL
const http = require('http')

let processes
let identifiers = []
let TESTER

before(function (done) {
  test.setUpTestEnv((p) => {
    processes = p
    identifiers = Object.keys(processes)
    TESTER = test.getTester()
    done()
  })
})

it('webpage loading', function (done) {
  http.get('http://127.0.0.1:7000', (res) => {
    expect(res.headers['content-type']).to.equal('text/html; charset=UTF-8')
    expect(res.statusCode).to.equal(200)
    done()
  })
})

it('api', function (done) {
  http.get('http://127.0.0.1:7000/all', (res) => {
    expect(res.headers['content-type']).to.equal('application/json; charset=utf-8')
    expect(res.statusCode).to.equal(200)

    let raw = ''
    res.on('data', (chunk) => raw += chunk)
    res.on('end', () => {
      let json = JSON.parse(raw)
      expect(Object.keys(json).length).to.equal(3)
      done()
    })
  })
})

after(function () {
  for (let p in processes) {
    processes[p].kill()
  }
})
