const imports = require('./../imports')

exports.ExtrairAtributosEpub = ($, tag, callback) => {
    let total = $(tag).length
    let retorno = []
    retorno.pop()
    for (let j = 0; j < total; j++) {
        retorno.push({
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
        })
    }
    return callback(retorno)
}

exports.ExtracaoRecursiva = ($, node) => {
    for (let i = 0; i < node.children.length; i++) {
        if (node.children[i].type === 'tag') {
            imports.tratativaClass.incrementaSeguenciaFilhos()
            let nomeObjetoFilho = ''
            this.ExtrairAtributosEpub($, node.children[i].name, retorno =>{
                nomeObjetoFilho = `filho${imports.tratativaClass.seguenciaFilhos}: ${retorno}`
                this.objetoTemporario += {nomeObjetoFilho}
                console.log(nomeObjetoFilho.filho1)
                //Pesquisarcomo criar um objeto dinamico
            })
        } else {
            console.log('text2: ---', node.type)
        }
    }
}

exports.objetoTemporario = {}
// achar forma recursivamente, criar outros objetos para os filhos de cada nó, e percorrer todos os nos, vendo as heranças de cada nó
// fazer ajustes e validações para passar do objeto temporário para a classe de retorno da API.
