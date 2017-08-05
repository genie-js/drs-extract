var fs = require('fs')
var DRS = require('genie-drs')

module.exports = function create (opts, cb) {
  var drs = DRS({
    isSWGB: opts.swgb
  })

  if (opts.input.length > 0) {
    console.error('Usage: drs-extract --create /path/to/archive.drs')
    process.exit(1)
  }

  drs.archive().pipe(fs.createWriteStream(opts.flags.create))
}
