var pump = require('pump')
var DRS = require('genie-drs')

module.exports = function get (opts, cb) {
  var id = parseInt(opts.input[1], 10)
  if (!isFinite(id)) {
    cb(new Error('\'' + opts.input[1] + '\' is not a valid file ID.'))
    return
  }

  var drs = DRS(opts.input[0])
  drs.read(onread)

  function onread () {
    pump(
      drs.createReadStream(parseInt(opts.input[1], 10)),
      process.stdout,
      cb
    )
  }
}
