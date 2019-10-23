exports.fs = require('fs')
exports.fse = require('fs-extra')
exports.unzip = require('unzip')
exports.rimraf = require('rimraf')
exports.cheerio = require('cheerio')
exports.unzipper = require('unzipper')

exports.pdfParser = require('pdf-parser')
const PDFExtract = require('pdf.js-extract').PDFExtract
exports.pdfExtract = new PDFExtract()

exports.path = require('path')

const xml2js = require('xml2js')
exports.parser = new xml2js.Parser()

exports.jsonfile = require('jsonfile')
exports.pointer = require('json-pointer')

exports.baseDocument = require('./baseDocumentos')

exports.classDocument = require('./Classes/classDocument')
exports.tratativaClass = require('./Classes/tratativasClassDocument')
exports.classErros = require('./Classes/classErros')
exports.classStyle = require('./Classes/classStyle')

exports.extrairDadosWord = require('./ExtracaoWord/extrairDadosWord')
exports.baseWord = require('./ExtracaoWord/baseWord')

exports.extrairDadosEpub = require('./ExtracaoEpub/extrairDadosEpub')
exports.baseEpub = require('./ExtracaoEpub/baseEpub')

exports.extrairDadosPdf = require('./ExtracaoPdf/extrairDadosPdf')
exports.basePdf = require('./ExtracaoPdf/basePdf')