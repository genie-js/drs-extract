#!/usr/bin/env node
var meow = require('meow')

var help = 'Usage:\n' +
  '  $ drs-extract --create /path/to/archive.drs\n' +
  '  $ drs-extract /path/to/archive.drs [--extract|--get|--add|--list] [options]\n' +
  '\n' +
  'Examples:\n' +
  '  Extract all files from an archive to a folder:\n' +
  '  $ drs-extract /path/to/archive.drs --extract /path/to/output/folder/\n' +
  '\n' +
  '  Print the contents of a single file to stdout:\n' +
  '  $ drs-extract /path/to/archive.drs --get 51000\n' +
  '\n' +
  '  Add a file to an archive:\n' +
  '  $ drs-extract /path/to/archive.drs --table bina --add 51000 /path/to/palette.pal\n' +
  '  $ generate-file | drs-extract /path/to/archive.drs --table bina --add 32533\n' +
  '\n' +
  '  Print a list of files in the archive:\n' +
  '  $ drs-extract /path/to/archive.drs --list\n'

var cli = meow(help, {
  flags: {
    create: {
      type: 'string',
      alias: 'c'
    },
    extract: {
      type: 'boolean',
      alias: 'e'
    },
    get: {
      type: 'boolean',
      alias: 'g'
    },
    add: {
      type: 'string',
      alias: 'a'
    },
    list: {
      type: 'boolean',
      alias: 'l'
    },
    table: {
      type: 'string',
      alias: 't'
    },
  }
})

var command
if (cli.flags.create) {
  command = require('./lib/create')
} else if (cli.flags.extract) {
  command = require('./lib/extract')
} else if (cli.flags.get) {
  command = require('./lib/get')
} else if (cli.flags.add) {
  command = require('./lib/add')
} else if (cli.flags.list) {
  command = require('./lib/list')
}

if (command) {
  command(cli, function (err) {
    if (err) throw err
  })
} else {
  cli.showHelp()
}
