//const imports = require('./imports')

exports.ExtrairAtributosEpub = ($, tag, callback) => {
    let total = $(tag).contents().length
    let retorno = []
    for (let j = 0; j < total; j++) {
        retorno.push({
            texto: $(tag).eq(j).html(),
            class: $(tag).eq(j).attr('class'),
            id: $(tag).eq(j).attr('id'),
            alt: $(tag).eq(j).attr('alt')            
        })
    }
    return callback(retorno)
}