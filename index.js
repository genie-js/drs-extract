#!/usr/bin/env node
'use strict'

var fs = require('fs')
var path = require('path')
var each = require('each-async')
var DRS = require('genie-drs')
var meow = require('meow')
var mkdirp = require('mkdirp')

var cli = meow({
  help: [
    'Usage',
    '  $ drs-extract <drs-file> <out-dir>',
    '',
    'Options',
    '  -v, --verbose  List extracted files',
    'Example',
    '  $ drs-extract interfac.drs /tmp/interfac/'
  ]
}, {
  alias: {
    v: 'verbose'
  }
})

function run (file, outDir) {
  var drs = DRS(file)
  drs.read(function () {
    each(drs.getFiles(), function (meta, i, next) {
      var name = meta.id + '.' + meta.type
      drs.readFile(meta.id, function (e, file) {
        if (e) return next(e)
        mkdirp.sync(outDir)
        fs.writeFileSync(path.join(outDir, name), file.buf)
        if (cli.flags.verbose) {
          console.log(meta.type + '/' + meta.id, '→', path.join(outDir, name))
        }
        next()
      })
    }, function (e) {
      if (e) throw e
    })
  })
}

if (cli.input.length < 2) {
  cli.showHelp()
} else {
  run(cli.input[0], cli.input[1])
}
