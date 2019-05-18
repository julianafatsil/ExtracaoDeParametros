module.exports = {
    erros: [{
        seguencia: null,
        message: null
    }],
    inserirErros(seguencia, message) {
        this.erros.push({
            seguencia,
            message
        })
    }
}