var fs = require('fs')
var path = require('path')
var mkdirp = require('mkdirp')
var each = require('each-async')
var pump = require('pump')
var DRS = require('genie-drs')

function getExtension (type) {
  return type.slice(0, 3)
}

module.exports = function extract (opts, cb) {
  var drs = DRS(opts.input[0])
  drs.read(onread)
  var outDir = opts.flags.o || opts.flags.outDir || opts.input[1]

  function onread () {
    mkdirp.sync(outDir)
    each(drs.getFiles(), onfile, function (err) {
      if (err) cb(err)
    })
  }

  function onfile (meta, i, next) {
    var name = meta.id + '.' + getExtension(meta.type)
    pump(
      drs.createReadStream(meta.id),
      fs.createWriteStream(path.join(outDir, name)),
      function (err) {
        if (err) return next(err)
        if (opts.flags.verbose) {
          console.log(meta.type + '/' + meta.id, '→', path.join(outDir, name))
        }
        next()
      }
    )
  }
}
