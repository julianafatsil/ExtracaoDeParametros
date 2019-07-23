const imports = require('../imports')

function pertenceAh(tag) {
    if (imports.tratativaClass.seguenciaFilhos - 1 > 0) {
        for (let i = 0; i < imports.tratativaClass.seguenciaFilhos - 1; i++) {
            if ((imports.baseEpub.objetoTemporario['filho' + i].tag === tag)) {
                return 'filho' + i
            }
        }
    } else {
        return 'body'
    }
}

exports.objetoTemporario = []
exports.objetoCssTemporario = []
exports.arquivosCss = []
exports.arquivosXhtml = []
exports.PastaArquivosEpub = ''

exports.TamanhoDaFonte = ''
exports.QtdCaracteresTamanhoDaFonte = 0
exports.CorDaFonte = ''
exports.QtdCaracteresCorDaFonte = 0
exports.AlinhamentoTexto = ''
exports.QtdCaracteresAlinhamentoTexto = 0
exports.CorDeFundo = ''
exports.QtdCaracteresCorDeFundo = ''
exports.TipoDaFonte = ''
exports.QtdCaracteresTipoDaFonte = ''

exports.ExtrairAtributosEpub = ($, tag, j, pertence, callback) => {
    let retorno = {
        pertence: (pertence ? pertence : ''),
        tag: tag,
        texto: $(tag).eq(j).text(),
        class: ($(tag).eq(j).attr('class') ? $(tag).eq(j).attr('class') : ''),
        id: $(tag).eq(j).attr('id'),
        alt: $(tag).eq(j).attr('alt'),
        title: $(tag).eq(j).attr('title'),
        href: $(tag).eq(j).attr('href'),
        target: $(tag).eq(j).attr('target'),
        type: $(tag).eq(j).attr('type'),
        src: $(tag).eq(j).attr('src'),
        name: $(tag).eq(j).attr('name'),
        style: ($(tag).eq(j).attr('style') ? $(tag).eq(j).attr('style') : '')
    }
    return callback(retorno)
}
exports.ExtracaoRecursiva = ($, node) => {
    let pertence = ''
    let j = 0
    for (let i = 0; i < node.children.length; i++) {
        if (node.children[i].type === 'tag') {
            let nomeObjeto = `filho${imports.tratativaClass.seguenciaFilhos}`
            imports.tratativaClass.incrementaSeguenciaFilhos()
            pertence = pertenceAh(node.children[i].parent.name, $(node.children[i].parent.name).parent().text())
            this.ExtrairAtributosEpub($, node.children[i].name, j, pertence, retorno => {
                this.objetoTemporario[nomeObjeto] = retorno
            })
            if (node.children[i].name === 'p')
                j++
            if (node.children[i].children.length > 0) {
                this.ExtracaoRecursiva($, node.children[i])
            }
        } else {
            // console.log('text2: ---', node.type)
        }
    }
}
exports.ExtracaoArqXhtmlECss = (caminhoDocumentoEpub, node, callback) => {
    for (let i = 0; i < node.children.length; i++) {
        if (node.children[i].type === 'tag') {
            if ((node.children[i].name === 'item')
                && (node.children[i].attribs['media-type'] === 'application/xhtml+xml')) {
                this.arquivosXhtml.push(caminhoDocumentoEpub + imports.baseEpub.PastaArquivosEpub[0] + '/' + node.children[i].attribs.href)
            }
            if ((node.children[i].name === 'item')
                && (node.children[i].attribs['media-type'] === 'text/css')) {
                this.arquivosCss.push(caminhoDocumentoEpub + imports.baseEpub.PastaArquivosEpub[0] + '/' + node.children[i].attribs.href)
            }
            if (node.children[i].children.length > 0) {
                this.ExtracaoArqXhtmlECss(caminhoDocumentoEpub, node.children[i])
            }
        }
    }
}
exports.ExtrairAudios = (posicao) => {
    if (this.ehAudio(this.objetoTemporario[posicao].tag)) {
        imports.tratativaClass.incrementaSeguenciaMidias()
        imports.classDocument.inserirAudios(
            imports.tratativaClass.seguenciaMidias,
            imports.tratativaClass.seguenciaMidias,
            this.objetoTemporario[posicao].alt,
            this.objetoTemporario[posicao].title //legenda
        )
    }
}
exports.ExtrairCabecalho = (posicao) => {
    imports.classDocument.inserirDadosDocumento(
        imports.baseDocument.caminhoArquivoHaProcessar,
        'epub'
    )
}
exports.ExtrairGraficos = (posicao) => {
    if (this.ehGrafico(this.objetoTemporario[posicao].tag)) {
        imports.tratativaClass.incrementaSeguenciaMidias()
        imports.classDocument.inserirGraficos(
            imports.tratativaClass.seguenciaMidias,
            imports.tratativaClass.seguenciaMidias,
            null, //estilo: 
            this.objetoTemporario[posicao].title,
            this.objetoTemporario[posicao].alt,
            this.objetoTemporario[posicao].name,
            null //legenda: 
        )
    }
}
exports.ExtrairImagens = (posicao) => {
    if ((this.ehImagem(this.objetoTemporario[posicao].tag)) &&
        (this.objetoTemporario[posicao].src.length > 1)) {
        imports.tratativaClass.incrementaSeguenciaMidias()
        imports.classDocument.inserirImagens(
            imports.tratativaClass.seguenciaMidias,
            imports.tratativaClass.seguenciaMidias,
            this.objetoTemporario[posicao].name,
            this.objetoTemporario[posicao].title,
            this.objetoTemporario[posicao].alt,
            null, //legenda
            this.objetoTemporario[posicao].src,
            posicao
        )
    }
}
exports.ExtrairTabelas = (posicao) => {
    if (this.ehTabela(this.objetoTemporario[posicao].tag)) {
        imports.tratativaClass.incrementaSeguenciaMidias()
        imports.classDocument.inserirTabelas(
            imports.tratativaClass.seguenciaMidias,
            imports.tratativaClass.seguenciaMidias,
            null, //estilo
            this.objetoTemporario[posicao].title, //tituloalt
            this.objetoTemporario[posicao].alt,
            null //legenda
        )
    }
}
exports.ExtrairTextos = (posicao) => {
    if (this.ehTexto(this.objetoTemporario[posicao].tag)) {
        let buscarCss = ExtrairDadosCss(posicao)
        //console.log('Retorno: ' + buscarCss.corDaFonte)

        if ((this.objetoTemporario[posicao].texto.trim()) && (this.objetoTemporario[posicao].texto.trim() != '\n\n')) {
            imports.tratativaClass.extrairQtdCaracteres(this.objetoTemporario[posicao].texto)
            if (imports.tratativaClass.qtdCaracteres > 0) {
                imports.tratativaClass.incrementaSeguenciaMidias()
                imports.classDocument.inserirTextos(
                    imports.tratativaClass.seguenciaMidias,
                    imports.tratativaClass.seguenciaMidias,
                    this.objetoTemporario[posicao].texto,
                    imports.tratativaClass.qtdCaracteres,
                    buscarCss.corDaFonte, //corDaFonte
                    buscarCss.tamanhoFonte, //tamanhoDaFonte
                    buscarCss.tipoDaFonte, //tipoDaFonte
                    buscarCss.corDeFundo, //corDeFundo
                    null, //titulo
                    buscarCss.alinhamentoTexto,
                    this.objetoTemporario[posicao].tag
                )
            }
        }
    }
}
exports.ExtrairVideos = (posicao) => {
    if (this.ehVideo(this.objetoTemporario[posicao].tag)) {
        imports.tratativaClass.incrementaSeguenciaMidias()
        imports.classDocument.inserirVideos(
            imports.tratativaClass.seguenciaMidias,
            imports.tratativaClass.seguenciaMidias,
            this.objetoTemporario[posicao].title, //tituloAlt
            this.objetoTemporario[posicao].alt,
            this.objetoTemporario[posicao].name,
            this.objetoTemporario[posicao].src,
            null
        )
    }
}
exports.ExtrairHead = (nodeHead) => {
    for (let h = 0; h < nodeHead.children.length; h++) {
        if (nodeHead.children[h].tagName === 'style')
            imports.baseEpub.objetoCssTemporario.push(nodeHead.children[h].children[0].data)
        //console.log(h + ' = ' + nodeHead.children[h].name + ' - ' + nodeHead.children[h].tagName)
    }
}
exports.ehTexto = (tag) => {
    return ((!this.ehImagem(tag)) && (!this.ehVideo(tag)) && (!this.ehAudio(tag)) && (!this.ehTabela(tag)) && (!this.ehGrafico(tag))
        && (!this.ehTabelaDados(tag)))
}
exports.ehVideo = (tag) => {
    return ((tag === 'video') || (tag === 'source') || (tag === 'track'))
}
exports.ehImagem = (tag) => {
    return ((tag === 'img') || (tag === 'figure'))
}
exports.ehAudio = (tag) => {
    return ((tag === 'audio') || (tag === 'source'))
}
exports.ehTabela = (tag) => {
    return (tag === 'table')
}
exports.ehTabelaDados = (tag) => {
    return ((tag === 'th') || (tag === 'tr') || (tag === 'td') || (tag === 'tbody') || (tag === 'thead'))
}
exports.ehGrafico = (tag) => {
    return (tag === 'canvas')
}
function ExtrairDadosCss(posicao) {
    let ObjetoInformacao = {}
    let arrayCss = CarregarTodoCss()
    LimparVariaveisEpub()
    ProcessarCss(posicao, arrayCss)

    ObjetoInformacao = {
        tamanhoFonte: imports.baseEpub.TamanhoDaFonte,
        corDaFonte: imports.baseEpub.CorDaFonte,
        alinhamentoTexto: imports.baseEpub.AlinhamentoTexto,
        corDeFundo: imports.baseEpub.CorDeFundo,
        tipoDaFonte: imports.baseEpub.TipoDaFonte
    }
    return ObjetoInformacao
}
function LimparVariaveisEpub() {
    imports.baseEpub.QtdCaracteresTamanhoDaFonte = 0
    imports.baseEpub.QtdCaracteresCorDaFonte = 0
    imports.baseEpub.QtdCaracteresAlinhamentoTexto = 0
    imports.baseEpub.QtdCaracteresCorDeFundo = 0
    imports.baseEpub.QtdCaracteresTipoDaFonte = 0

    imports.baseEpub.TamanhoDaFonte = ''
    imports.baseEpub.CorDaFonte = '000000'
    imports.baseEpub.AlinhamentoTexto = 'left'
    imports.baseEpub.CorDeFundo = 'white'
    imports.baseEpub.TipoDaFonte = 'Times'
}
function RetornarTagCss(tagCss, classCss) {
    let tagTemporaria = ''
    let retorno = ''
    if (classCss.indexOf(`${tagCss}`) > 0) {
        tagTemporaria = classCss.substring(classCss.indexOf(`${tagCss}`))
        retorno = tagTemporaria.substring(classCss.substring(classCss.indexOf(`${tagCss}`))
            , tagTemporaria.indexOf(';'))
    }
    retorno = retorno.replace(`${tagCss}`, '')
    retorno = retorno.replace(`inherit`, '')
    return retorno
}
function ProcessarCss(posicao, arrayCss) {

    ProcessarCssStyle(posicao)

    ProcessarCapturarCss(posicao, arrayCss)

    ProcessarCssPertenceRecursiva(posicao, arrayCss)

}

function ProcessarCssStyle(posicao) {
    let arrayStyle = substituir(imports.baseEpub.objetoTemporario[posicao].style, ' ', '')

    CapturarFontSize(arrayStyle)
}
function ProcessarCapturarCss(posicao, arrayCss) {
    let classeCss

    if ((arrayCss.indexOf(imports.baseEpub.objetoTemporario[posicao].tag + '.' + imports.baseEpub.objetoTemporario[posicao].class + '{') === 0) &&
        (arrayCss.indexOf(imports.baseEpub.objetoTemporario[posicao].class + '{') > 0)) {

        classeCss = RetornarClasseCss(arrayCss, imports.baseEpub.objetoTemporario[posicao].class + '{')
        if (imports.baseEpub.QtdCaracteresTamanhoDaFonte === 0)
            CapturarFontSize(classeCss)

        if (imports.baseEpub.QtdCaracteresCorDaFonte === 0)
            CapturarColor(classeCss)

        if (imports.baseEpub.QtdCaracteresCorDeFundo === 0)
            CapturarFontBackgroundColor(classeCss)

        if (imports.baseEpub.QtdCaracteresTipoDaFonte === 0)
            CapturarFontFamily(classeCss)

        if (imports.baseEpub.QtdCaracteresAlinhamentoTexto === 0)
            CapturarFontAlign(classeCss)
    }

    if ((arrayCss.indexOf(imports.baseEpub.objetoTemporario[posicao].tag + '.' +
        imports.baseEpub.objetoTemporario[posicao].class + '{') > 0)) {

        classeCss = RetornarClasseCss(arrayCss, imports.baseEpub.objetoTemporario[posicao].tag +
            '.' + imports.baseEpub.objetoTemporario[posicao].class + '{')

        if (imports.baseEpub.QtdCaracteresTamanhoDaFonte === 0)
            CapturarFontSize(classeCss)

        if (imports.baseEpub.QtdCaracteresCorDaFonte === 0)
            CapturarColor(classeCss)

        if (imports.baseEpub.QtdCaracteresCorDeFundo === 0)
            CapturarFontBackgroundColor(classeCss)

        if (imports.baseEpub.QtdCaracteresTipoDaFonte === 0)
            CapturarFontFamily(classeCss)

        if (imports.baseEpub.QtdCaracteresAlinhamentoTexto === 0)
            CapturarFontAlign(classeCss)

    }

    if ((arrayCss.indexOf(imports.baseEpub.objetoTemporario[posicao].tag + '{') > 0)) {
        classeCss = RetornarClasseCss(arrayCss, imports.baseEpub.objetoTemporario[posicao].tag + '{')
        if (imports.baseEpub.QtdCaracteresTamanhoDaFonte === 0)
            CapturarFontSize(classeCss)

        if (imports.baseEpub.QtdCaracteresCorDaFonte === 0)
            CapturarColor(classeCss)

        if (imports.baseEpub.QtdCaracteresCorDeFundo === 0)
            CapturarFontBackgroundColor(classeCss)

        if (imports.baseEpub.QtdCaracteresTipoDaFonte === 0)
            CapturarFontFamily(classeCss)

        if (imports.baseEpub.QtdCaracteresAlinhamentoTexto === 0)
            CapturarFontAlign(classeCss)
    }
}
function ProcessarCssPertenceRecursiva(posicao, arrayCss) {
    ProcessarCapturarCss(posicao, arrayCss)
    if ((imports.baseEpub.objetoTemporario[posicao].pertence !== '') && (imports.baseEpub.objetoTemporario[posicao].pertence !== 'html'))
        ProcessarCssPertenceRecursiva(imports.baseEpub.objetoTemporario[posicao].pertence, arrayCss)
}
function CarregarTodoCss() {
    let retornaCss = ''
    for (let i = 0; i < imports.baseEpub.objetoCssTemporario.length; i++)
        retornaCss += substituir(imports.baseEpub.objetoCssTemporario[i], ' ', '')
    return retornaCss
}
function CapturarFontSize(tagCss) {
    let Aux = RetornarTagCss('font-size:', tagCss)
    imports.baseEpub.TamanhoDaFonte = Aux
    imports.baseEpub.QtdCaracteresTamanhoDaFonte = Aux.length
}
function CapturarColor(tagCss) {
    let Aux = RetornarTagCss('color:', tagCss)
    imports.baseEpub.CorDaFonte = Aux
    imports.baseEpub.QtdCaracteresCorDaFonte = Aux.length
}
function CapturarFontAlign(tagCss) {
    let Aux = RetornarTagCss('font-align:', tagCss)
    imports.baseEpub.AlinhamentoTexto = Aux
    imports.baseEpub.QtdCaracteresAlinhamentoTexto = Aux.length
}
function CapturarFontFamily(tagCss) {
    let Aux = RetornarTagCss('font-family:', tagCss)
    imports.baseEpub.TipoDaFonte = Aux
    imports.baseEpub.QtdCaracteresTipoDaFonte = Aux.length
}
function CapturarFontBackgroundColor(tagCss) {
    let Aux = RetornarTagCss('background-color:', tagCss)
    imports.baseEpub.CorDeFundo = Aux
    imports.baseEpub.QtdCaracteresCorDeFundo = Aux.length
}
function RetornarClasseCss(arrayCss, encontrarTag) {
    let armazena = arrayCss.substring(arrayCss.indexOf(encontrarTag))
    return armazena.substring(0, armazena.indexOf('}'))
}
function substituir(texto, de, por) {
    var regex = new RegExp(de, "g")
    return texto.replace(regex, por)
}