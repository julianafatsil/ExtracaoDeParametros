const imports = require('../imports')

function pertenceAh(tag) {
    if (imports.tratativaClass.seguenciaFilhos - 1 > 0) {
        for (let i = 0; i < imports.tratativaClass.seguenciaFilhos - 1; i++) {
            if ((imports.baseEpub.objetoTemporario['filho' + i].tag === tag)) {
                return 'filho' + i
            }
        }
    }else{
        return 'body'
    }
}

exports.objetoTemporario = []

exports.ExtrairAtributosEpub = ($, tag, j, pertence, callback) => {
    let retorno = {
        pertence: pertence,
        tag: tag,
        texto: $(tag).eq(j).text(),
        class: $(tag).eq(j).attr('class'),
        id: $(tag).eq(j).attr('id'),
        alt: $(tag).eq(j).attr('alt'),
        title: $(tag).eq(j).attr('title'),
        href: $(tag).eq(j).attr('href'),
        target: $(tag).eq(j).attr('target'),
        type: $(tag).eq(j).attr('type'),
        src: $(tag).eq(j).attr('src')
    }
    return callback(retorno)
}

exports.ExtracaoRecursiva = ($, node) => {
    let pertence = ''
    for (let i = 0; i < node.children.length; i++) {
        if (node.children[i].type === 'tag') {
            let nomeObjeto = `filho${imports.tratativaClass.seguenciaFilhos}`
            imports.tratativaClass.incrementaSeguenciaFilhos()
            pertence = pertenceAh(node.children[i].parent.name, $(node.children[i].parent.name).parent().text())
            console.log(node.children[i].childNodes)
            this.ExtrairAtributosEpub($, node.children[i].name, imports.tratativaClass.seguenciaFilhos-1, pertence, retorno => {
                this.objetoTemporario[nomeObjeto] = retorno
            })
            if (node.children[i].children.length > 0) {
                this.ExtracaoRecursiva($, node.children[i])
            }
        } else {
            // console.log('text2: ---', node.type)
        }
    }
}

exports.ExtrairAudios = () => {
    imports.tratativaClass.incrementaSeguenciaMidias()
    imports.classDocument.inserirAudios(
        imports.tratativaClass.seguenciaMidias
    )
}

exports.ExtrairCabecalho = () => {
    imports.classDocument.inserirDadosDocumento(
        'Caminho Tal',
        'Epub'
    )
}

exports.ExtrairGraficos = () => {
    imports.tratativaClass.incrementaSeguenciaMidias()
    imports.classDocument.inserirGraficos(
        imports.tratativaClass.seguenciaMidias
    )
}

exports.ExtrairImagens = () => {
    imports.tratativaClass.incrementaSeguenciaMidias()
    imports.classDocument.inserirImagens(
        imports.tratativaClass.seguenciaMidias
    )
}

exports.ExtrairTabelas = () => {
    imports.tratativaClass.incrementaSeguenciaMidias()
    imports.classDocument.inserirTabelas(
        imports.tratativaClass.seguenciaMidias
    )
}

exports.ExtrairTextos = () => {
    console.log('ola mundo!')
    for (let i = 0; i < imports.tratativaClass.seguenciaFilhos; i++) {
        console.log(i)
        imports.tratativaClass.extrairQtdCaracteres(imports.baseEpub.objetoTemporario['filho'+i].texto)
        if (imports.tratativaClass.qtdCaracteres > 0) {
            imports.tratativaClass.incrementaSeguenciaMidias()
            imports.classDocument.inserirTextos(
                imports.tratativaClass.seguenciaMidias,
                imports.tratativaClass.seguenciaMidias,
                imports.baseEpub.objetoTemporario['filho'+i].texto,
                imports.tratativaClass.qtdCaracteres,

            )
        }
    }
}

exports.ExtrairVideos = () => {
    imports.tratativaClass.incrementaSeguenciaMidias()
    imports.classDocument.inserirVideos(
        imports.tratativaClass.seguenciaMidias
    )
}




// fazer ajustes e validações para passar do objeto temporário para a classe de retorno da API.
// criar um objeto CSS temporario