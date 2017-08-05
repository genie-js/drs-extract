var prettyBytes = require('pretty-bytes')
var DRS = require('genie-drs')

module.exports = function list (opts, cb) {
  var drs = DRS(opts.input[0])
  drs.read(onread)

  function onread (err) {
    if (err) return cb(err)
    drs.getFiles().forEach(function (file) {
      console.log(template(file))
    })
    cb()
  }

  function template (file) {
    return file.id + ' ' + file.type + ' - ' + prettyBytes(file.size)
  }
}
