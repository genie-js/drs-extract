var fs = require('fs')
var createWriteStreamAtomic = require('fs-write-stream-atomic')
var eos = require('end-of-stream')
var DRS = require('genie-drs')

module.exports = function add (opts, cb) {
  var drs = DRS(opts.input[0])
  drs.read(onread)

  var table = opts.flags.table
  var id = parseInt(opts.flags.add, 10)

  var stream
  if (opts.input[1]) {
    stream = fs.createReadStream(opts.input[1])
  } else {
    stream = process.stdin
  }

  function onread (err) {
    if (err) return cb(err)
    eos(stream.pipe(drs.createWriteStream(table, id)), onadded)
  }

  function onadded (err) {
    if (err) return cb(err)

    var outfile = createWriteStreamAtomic(opts.input[0])
    eos(drs.archive().pipe(outfile), cb)
  }
}
