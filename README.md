# read-boost-config

[![Build Status](https://travis-ci.org/evanlucas/read-boost-config.svg)](https://travis-ci.org/evanlucas/read-boost-config)
[![Coverage Status](https://coveralls.io/repos/evanlucas/read-boost-config/badge.svg?branch=master&service=github)](https://coveralls.io/github/evanlucas/read-boost-config?branch=master)

Read boost config file in js

*Note: `read-boost-config` is only supported on iojs and node v4+. To use with
an older version of node, please use `read-boost-config@1`.*

## Install

```bash
$ npm install [--save] [-g] read-boost-config
```

## Test

```bash
$ npm test
```

## Coverage

```bash
$ npm test -- --cov
```

## API

```js
// parse a string
var str = 'name=evan\n'
console.log(read.parseString(str))
// => { name: 'evan' }

// parse a file
read.parseFileSync('test/fixture')
// => { name: 'evan', foo: 'bar' }

// parse file async
read.parseFile('test/fixture', function(err, data) {
  if (err) throw err
  console.log(data)
  // => { name: 'evan', foo: 'bar' }
})
```

## CLI Tool

```bash
$ echo 'name=evan\n' | read-boost-config --json
// => {
// =>   "name": "evan"
// => }
```

## Author

Evan Lucas

## License

MIT (See `LICENSE` for more info)
