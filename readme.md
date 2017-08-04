# drs-extract

Extract Genie (Age of Empires, SWGB) .DRS archives.

## Installation

```bash
npm install --global drs-extract
```

## Usage

```bash
$ drs-extract --help

Usage
  $ drs-extract --list <drs-file>
  $ drs-extract <drs-file> --file <id>
  $ drs-extract <drs-file> <out-dir>

Options
  --list         List files in the archive
  --file         Extract a single file. Outputs to stdout.
  -v, --verbose  List extracted files
Example
  $ drs-extract interfac.drs /tmp/interfac/
```

## Programmatic Usage

Use [genie-drs](https://github.com/goto-bus-stop/genie-drs), the API library :)

## Licence

[MIT](./LICENSE)
