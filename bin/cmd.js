#!/usr/bin/env node

'use strict'

const help = require('help')()
    , nopt = require('nopt')
    , read = require('../')
    , getstdin = require('get-stdin')
    , knownOpts = { help: Boolean
                  , version: Boolean
                  , eval: String
                  , json: Boolean
                  }
    , shortHand = { h: ['--help']
                  , v: ['--version']
                  , e: ['--eval']
                  , j: ['--json']
                  }
    , parsed = nopt(knownOpts, shortHand)

if (parsed.help)
  return help()

if (parsed.version) {
  console.log('read-boost-config', 'v' + require('../package').version)
  return
}

if (parsed.eval) {
  parseStr(parsed.eval)
  return
}
const args = parsed.argv.remain

if (args.length) {
  const fp = args.shift()
  if (!fp) {
    return help()
  }
  print(read.parseFileSync(fp))
} else {
  var buf = ''
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', function(chunk) {
    buf += chunk
  })
  process.stdin.on('end', function() {
    parseStr(buf)
  })
}

function parseStr(str) {
  print(read.parseString(str))
}

function print(out) {
  if (parsed.json) {
    console.log(JSON.stringify(out, null, 2))
  } else {
    console.log(out)
  }
}
