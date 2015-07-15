var fs = require('fs')
  , objectPath = require('object-path')

module.exports = parseFile
module.exports.parseFile = parseFile
module.exports.parseFileSync = parseFileSync
module.exports.parseString = parseString

function parseFile(file, cb) {
  fs.readFile(file, 'utf8', function(err, data) {
    if (err) return cb(err)
    var result = parseString(data)
    cb(null, result)
  })
}

function parseFileSync(file) {
  var data = fs.readFileSync(file, 'utf8')
  return parseString(data)
}

function parseString(str) {
  var lines = str.split('\n')
  if (!lines.length) return {}
  var result = parse(lines)
  return result
}

function parse(lines) {
  var parent
  var len = lines.length
  var i = -1
  var result = {}
  while (i++ < len) {
    var item = lines[i]
    if (!item) continue
    var output = parseLine(item, parent)
    if (!output.valid) {
      continue
    }
    if (output.section) {
      parent = output.section
      if (output.key && output.value) {
        objectPath.set(result, parent + '.' + output.key, output.value)
      }
    } else {
      result[output.key] = output.value
    }
  }

  return result
}

function parseLine(line, parent) {
  var out = {
    valid: true
  , key: ''
  , value: ''
  , section: ''
  }

  if (typeof line !== 'string') {
    out.valid = false
    return out
  }

  line = line.trim()
  var len = line.length

  if (line[0] === '[' && line[len - 1] === ']') {
    // possibly section
    out.section = line.substring(1, len - 1)
    return out
  }

  if (line[0] === '#') {
    // comment
    out.valid = false
    return out
  }

  var idx = line.indexOf('=')

  if (!~idx) {
    out.valid = false
    return out
  }

  for (var i = 0; i < idx; i++) {
    out.key += line[i]
  }

  for (var i = idx + 1; i < len; i++) {
    if (line[i] === '#') break
    out.value += line[i]
  }

  out.key = out.key.trim()
  out.value = out.value.trim()
  if (parent)
    out.section = parent

  return out
}
