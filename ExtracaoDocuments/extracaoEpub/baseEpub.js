const imports = require('./../imports')

exports.ExtrairAtributosEpub = ($, tag, j, pertence, callback) => {
    let retorno = []
    retorno.pop()
            retorno.push({
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
        })
    return callback(retorno)
}

exports.ExtracaoRecursiva = ($, node, pertence) => {
    for (let i = 0; i < node.children.length; i++) {
        if (node.children[i].type === 'tag') {
            let nomeObjeto = `filho${imports.tratativaClass.seguenciaFilhos}`
            imports.tratativaClass.incrementaSeguenciaFilhos()
            this.ExtrairAtributosEpub($, node.children[i].name, 0, pertence, retorno =>{
                this.objetoTemporario[nomeObjeto] = retorno
            })
            if (node.children[i].children.length > 0){
                this.ExtracaoRecursiva($, node.children[i])
            }
        } else {
            // console.log('text2: ---', node.type)
        }
    }
}

exports.objetoTemporario = {}
// achar forma recursivamente, criar outros objetos para os filhos de cada nó, e percorrer todos os nos, vendo as heranças de cada nó
// fazer ajustes e validações para passar do objeto temporário para a classe de retorno da API.
