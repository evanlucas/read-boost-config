#!/usr/bin/env node

var help = require('help')()
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

getstdin(function(data) {
  if (data) {
    parseStr(data)
  } else {
    var fp = parsed.argv.remain.shift()
    if (!fp) {
      return help()
    }
    print(read.parseFileSync(fp))
  }
})

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
