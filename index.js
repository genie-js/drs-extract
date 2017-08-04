#!/usr/bin/env node
'use strict'

var fs = require('fs')
var path = require('path')
var each = require('each-async')
var DRS = require('genie-drs')
var meow = require('meow')
var mkdirp = require('mkdirp')
var prettyBytes = require('pretty-bytes')

var cli = meow({
  help: [
    'Usage',
    '  $ drs-extract --list <drs-file>',
    '  $ drs-extract <drs-file> --file <id>',
    '  $ drs-extract <drs-file> <out-dir>',
    '',
    'Options',
    '  --list         List files in the archive',
    '  --file         Extract a single file. Outputs to stdout.',
    '  -v, --verbose  List extracted files',
    'Example',
    '  $ drs-extract interfac.drs /tmp/interfac/'
  ]
}, {
  alias: {
    v: 'verbose'
  },
  boolean: [
    'list'
  ]
})

function getExtension (type) {
  return type.slice(0, 3)
}

function extract (file, outDir) {
  var drs = DRS(file)
  drs.read(onread)

  function onread () {
    each(drs.getFiles(), onfile, function (e) {
      if (e) throw e
    })
  }

  function onfile (meta, i, next) {
    var name = meta.id + '.' + getExtension(meta.type)
    drs.readFile(meta.id, function (e, file) {
      if (e) return next(e)
      mkdirp.sync(outDir)
      fs.writeFileSync(path.join(outDir, name), file.buf)
      if (cli.flags.verbose) {
        console.log(meta.type + '/' + meta.id, '→', path.join(outDir, name))
      }
      next()
    })
  }
}

function extractOne (file, id) {
  var drs = DRS(file)
  drs.read(onread)

  function onread () {
    drs.readFile(id, function (e, file) {
      if (e) throw e
      process.stdout.write(file.buf)
    })
  }
}

function list (file) {
  var drs = DRS(file)
  drs.read(onread)

  function onread () {
    drs.getFiles().forEach(function (file) {
      console.log(template(file))
    })
  }

  function template (file) {
    return file.id + ' ' + file.type + ' - ' + prettyBytes(file.size)
  }
}

if (cli.flags.list && cli.input.length >= 1) {
  list(cli.input[0])
} else if (cli.flags.file && cli.input.length >= 1) {
  extractOne(cli.input[0], parseInt(cli.flags.file, 10))
} else if (cli.input.length >= 2) {
  extract(cli.input[0], cli.input[1])
} else {
  cli.showHelp()
}
