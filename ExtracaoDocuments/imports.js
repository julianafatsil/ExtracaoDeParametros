exports.path = require('path')

const xml2js = require('xml2js')
exports.parser = new xml2js.Parser()

exports.jsonfile = require('jsonfile')

exports.pointer = require('json-pointer')

exports.baseDocument = require('./baseDocument')

exports.classDocument = require('./classDocument')
exports.tratativaClass = require('./tratativasClassDocument')

exports.extrairTabelasWord = require('./ExtracaoWord/extrairTabelas')