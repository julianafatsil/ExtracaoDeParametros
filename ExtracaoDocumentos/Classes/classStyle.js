module.exports = {
    style: [{
        titulo: null,
        nomeFonte: null
    }],
    inserirStyle(titulo, nomeFonte) {
        this.style.push({
            titulo,
            nomeFonte
        })
    }
}