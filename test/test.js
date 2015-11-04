'use strict'

const test = require('tap').test
    , read = require('../')
    , path = require('path')
    , fix = path.join(__dirname, 'fixture')

test('parseString should work', function(t) {
  const str = 'name=evan\nfoo=bar\n'
  const out = read.parseString(str)
  t.deepEqual(out, {
    name: 'evan'
  , foo: 'bar'
  })
  t.end()
})

test('parseString should work with sections', function(t) {
  const str = '[foo.bar]\n' +
    'name=evan\n' +
    'foo=bar\n'

  const out = read.parseString(str)
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
  const str = 'name=evan\n' +
    '#foo=bar\n'

  const out = read.parseString(str)
  t.deepEqual(out, {
    name: 'evan'
  })

  t.end()
})

test('parseString should skip comments at end of line', function(t) {
  const str = 'name=evan # This is my name\n' +
    '#foo=bar\n'

  const out = read.parseString(str)
  t.deepEqual(out, {
    name: 'evan'
  })

  t.end()
})

test('parseString should return empty object for empty string', function(t) {
  const str = ''
  t.deepEqual(read.parseString(''), {})
  t.end()
})

test('parseString should skip invalid lines', function(t) {
  const str = 'thisisatest'
  t.deepEqual(read.parseString(str), {})
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

test('parseFile fails if fs.readFile fails', function(t) {
  read.parseFile('dasfasdf', function(err, result) {
    t.type(err, 'Error')
    t.end()
  })
})

test('parseFileSync should work', function(t) {
  const result = read.parseFileSync(fix)
  t.deepEqual(result, {
    name: 'evan'
  , foo: 'bar'
  })
  t.end()
})
