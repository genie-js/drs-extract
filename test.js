var test = require('tape')
var spawnSync = require('child_process').spawnSync

test('get', function (t) {
  t.plan(6)

  var res = spawnSync('./index.js', ['test.drs', '--get', '2'])
  t.ok(res)
  t.ok(res.stdout.length > 0)
  t.equal(res.stderr.length, 0)

  res = spawnSync('./index.js', ['test.drs', '--get', 'xyz'])
  t.ok(res)
  t.equal(res.stdout.length, 0)
  t.ok(res.stderr.length > 0)
})
