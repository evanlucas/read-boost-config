var test = require('tap').test
  , read = require('../')
  , path = require('path')
  , fix = path.join(__dirname, 'fixture')

test('parseString should work', function(t) {
  var str = 'name=evan\nfoo=bar\n'
  var out = read.parseString(str)
  t.deepEqual(out, {
    name: 'evan'
  , foo: 'bar'
  })
  t.end()
})

test('parseString should work with sections', function(t) {
  var str = '[foo.bar]\n' +
    'name=evan\n' +
    'foo=bar\n'

  var out = read.parseString(str)
  t.deepEqual(out, {
    foo: {
      bar: {
        name: 'evan'
      , foo: 'bar'
      }
    }
  })

  t.end()
})

test('parseString should skip commented lines', function(t) {
  var str = 'name=evan\n' +
    '#foo=bar\n'

  var out = read.parseString(str)
  t.deepEqual(out, {
    name: 'evan'
  })

  t.end()
})

test('parseString should skip comments at end of line', function(t) {
  var str = 'name=evan # This is my name\n' +
    '#foo=bar\n'

  var out = read.parseString(str)
  t.deepEqual(out, {
    name: 'evan'
  })

  t.end()
})

test('parseFile should work', function(t) {
  read.parseFile(fix, function(err, result) {
    t.ifError(err)
    t.deepEqual(result, {
      name: 'evan'
    , foo: 'bar'
    })
    t.end()
  })
})

test('parseFileSync should work', function(t) {
  var result = read.parseFileSync(fix)
  t.deepEqual(result, {
    name: 'evan'
  , foo: 'bar'
  })
  t.end()
})
