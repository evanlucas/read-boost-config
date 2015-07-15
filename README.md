# read-boost-config

[![Build Status](https://travis-ci.org/evanlucas/read-boost-config.svg)](https://travis-ci.org/evanlucas/read-boost-config)

Read boost config file in js

## Install

```bash
$ npm install [--save] [-g] read-boost-config
```

## Test

```bash
$ npm test
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
