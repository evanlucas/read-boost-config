'use strict'

const fs = require('fs')
    , objectPath = require('object-path')

module.exports = parseFile
module.exports.parseFile = parseFile
module.exports.parseFileSync = parseFileSync
module.exports.parseString = parseString

function parseFile(file, cb) {
  fs.readFile(file, 'utf8', function(err, data) {
    if (err) return cb(err)
    const result = parseString(data)
    cb(null, result)
  })
}

function parseFileSync(file) {
  const data = fs.readFileSync(file, 'utf8')
  return parseString(data)
}

function parseString(str) {
  const lines = str.split('\n')
  if (!lines.length) return {}
  const result = parse(lines)
  return result
}

function parse(lines) {
  var parent
  const len = lines.length
  var i = -1
  const result = {}
  while (i++ < len) {
    const item = lines[i]
    if (!item) continue
    const output = parseLine(item, parent)
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
  const out = {
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
  const len = line.length

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

  const idx = line.indexOf('=')

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
