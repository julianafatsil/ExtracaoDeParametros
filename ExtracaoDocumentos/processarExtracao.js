imports = require('./imports')

exports.ProcessarExtracao = (CaminhoArquivo, callback) => {
    console.log(CaminhoArquivo)

    if (!CaminhoArquivo)
        return callback({ message: 'Erro: Arquivo não informado' })

    let codigoArquivo = imports.extrairDocs.ExtrairCodigoExtensao(CaminhoArquivo)
    if (imports.extrairDocs.NaoEhExtensaoValida(codigoArquivo))
        return callback({ message: 'Erro: Arquivo informado com extensão inválida' })

    imports.extrairDocs.ExecucaoExtracao(codigoArquivo, CaminhoArquivo, (Retorno) => {
        imports.baseDocument.ExcluirDiretorioComArquivos(retorno => {})
        return callback(Retorno)
    })
}