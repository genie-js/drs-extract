#!/usr/bin/env node
var meow = require('meow')

var cli = meow(`
  Usage:
    $ drs-extract --create /path/to/archive.drs
    $ drs-extract /path/to/archive.drs [--extract|--get|--add|--list] [options]
`, {
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
