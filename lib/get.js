var pump = require('pump')
var DRS = require('genie-drs')

module.exports = function get (opts, cb) {
  var drs = DRS(opts.input[0])
  drs.read(onread)

  function onread () {
    pump(
      drs.createReadStream(opts.input[1]),
      process.stdout,
      cb
    )
  }
}
