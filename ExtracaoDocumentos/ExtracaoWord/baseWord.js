const imports = require('../imports')

module.exports = {
    legenda: '',
    totalGrafico: 0,

    extrairLegenda(RecebeJson, PosicaoI) {
        let CaminhoWP = `/w:document/w:body/0/w:p/${(PosicaoI + 1)}/`

        let RecebeDadosLegenda = ''
        if (imports.pointer.has(RecebeJson, `${CaminhoWP}w:r`)) {
            let TotalLegenda = imports.pointer.get(RecebeJson, `${CaminhoWP}w:r`).length
            if (TotalLegenda > 0) {
                for (let k = 0; k < TotalLegenda; k++) {
                    if ((imports.pointer.has(RecebeJson, `${CaminhoWP}w:pPr/0/w:pStyle/0`)) &&
                        (imports.pointer.get(RecebeJson, `${CaminhoWP}w:pPr/0/w:pStyle/0/$/w:val`).toUpperCase() === 'LEGENDA')) {
                        if (imports.pointer.has(RecebeJson, `${CaminhoWP}w:r/${k}/w:t/0/_`)) {
                            RecebeDadosLegenda = imports.pointer.get(RecebeJson, `${CaminhoWP}w:r/${k}/w:t/0/_`)
                        }
                    }
                }
            }
        }
        this.legenda = RecebeDadosLegenda
    },
    ehTexto(RecebeJson, caminhoTextoWpr, caminhoTextoWr) {
        return (((imports.pointer.has(RecebeJson, `${caminhoTextoWpr}w:pStyle/0/$/w:val`)) &&
            (!imports.pointer.has(RecebeJson, `${caminhoTextoWr}w:drawing/0/wp:inline/0/wp:docPr/0/a:hlinkClick/0`)) &&
            (imports.pointer.get(RecebeJson, `${caminhoTextoWpr}w:pStyle/0/$/w:val`).toUpperCase() !== 'LEGENDA')))
    },
    ehVideo(RecebeJson, caminhoVideo) {
        return ((imports.pointer.has(RecebeJson, `${caminhoVideo}wp:docPr/0/$/id`)) &&
            (imports.pointer.has(RecebeJson, `${caminhoVideo}wp:docPr/0/a:hlinkClick/0`)))
    },
    ehImagem(RecebeJson, caminhoImagem) {
        return ((imports.pointer.has(RecebeJson, `${caminhoImagem}/a:graphic/0/a:graphicData/0/pic:pic/0`))
            && (!imports.pointer.has(RecebeJson, `${caminhoImagem}/wp:docPr/0/a:hlinkClick/0`)))
    },
    ehGrafico(RecebeJson, PosicaoI, PosicaoJ) {
        return ((imports.pointer.has(RecebeJson, `/w:document/w:body/0/w:p/${PosicaoI}/w:r/${PosicaoJ}/w:drawing/0/wp:inline/0/wp:cNvGraphicFramePr`)) &&
            (!imports.pointer.has(RecebeJson, `/w:document/w:body/0/w:p/${PosicaoI}/w:r/${PosicaoJ}/w:drawing/0/wp:inline/0/a:graphic/0/a:graphicData/0/pic:pic/0`)))
    },
    ExtrairAudios(RecebeJson, PosicaoI, PosicaoJ) {
        let caminhoAudio = `/w:document/w:body/0/w:p/${PosicaoI}/w:r/${PosicaoJ}/w:object/0/v:shape/0`
        if (imports.pointer.has(RecebeJson, caminhoAudio)) {
            let RecebeDadosAudios = imports.pointer.get(RecebeJson, caminhoAudio)

            imports.baseWord.extrairLegenda(RecebeJson, PosicaoI)
            imports.tratativaClass.incrementaSeguenciaMidias()
            imports.classDocument.inserirAudios(
                imports.tratativaClass.seguenciaMidias,
                RecebeDadosAudios.$.id,
                RecebeDadosAudios.$.alt,
                imports.baseWord.legenda
            )
        }
    },
    ExtrairCabecalho(RecebeJson) {
        let color = ''
        let themeColor = ''
        let themeShade = ''

        if (imports.pointer.has(RecebeJson, '/w:document/w:background/0/$/w:color')) {
            color = imports.pointer.get(RecebeJson, '/w:document/w:background/0/$/w:color')
            themeColor = imports.pointer.get(RecebeJson, '/w:document/w:background/0/$/w:themeColor')
            themeShade = imports.pointer.get(RecebeJson, '/w:document/w:background/0/$/w:themeShade')
        }

        imports.classDocument.inserirDadosDocumento(
            'Caminho Tal',
            'docx',
            color,
            themeColor,
            themeShade
        )
    },
    ExtrairGraficos(RecebeJson, PosicaoI, PosicaoJ) {
        let caminhoGrafico = `/w:document/w:body/0/w:p/${PosicaoI}/w:r/${PosicaoJ}/mc:AlternateContent/0/mc:Choice/0/w:drawing/0/wp:inline/0/wp:docPr`
        if (imports.pointer.has(RecebeJson, caminhoGrafico)) {
            InserirGrafico(RecebeJson, PosicaoI, caminhoGrafico)
        }

        if (imports.baseWord.ehGrafico(RecebeJson, PosicaoI, PosicaoJ)) {
            caminhoGrafico = `/w:document/w:body/0/w:p/${PosicaoI}/w:r/${PosicaoJ}/w:drawing/0/wp:inline/0/wp:docPr`
            InserirGrafico(RecebeJson, PosicaoI, caminhoGrafico)
        }
    },
    ExtrairImagens(RecebeJson, PosicaoI, PosicaoJ) {
        let caminhoImagem = `/w:document/w:body/0/w:p/${PosicaoI}/w:r/${PosicaoJ}/w:drawing/0/wp:inline/0`

        if (imports.baseWord.ehImagem(RecebeJson, caminhoImagem)) {
            let RebeceDadosImagens = imports.pointer.get(RecebeJson, `${caminhoImagem}/wp:docPr/0`)

            imports.tratativaClass.incrementaSeguenciaMidias()
            imports.baseWord.extrairLegenda(RecebeJson, PosicaoI)

            imports.classDocument.inserirImagens(
                imports.tratativaClass.seguenciaMidias,
                RebeceDadosImagens.$.id,
                RebeceDadosImagens.$.name,
                RebeceDadosImagens.$.title,
                RebeceDadosImagens.$.descr,
                imports.baseWord.legenda
            )
        }
    },
    ExtrairTabelas(RecebeJson) {
        let CaminhoTabela = `/w:document/w:body/0/w:tbl`

        let TotalLinhasTbl = imports.pointer.get(RecebeJson, CaminhoTabela).length
        for (let i = 0; i < TotalLinhasTbl; i++) {
            CaminhoTabela = `/w:document/w:body/0/w:tbl/${i}/w:tblPr/0/`
            try {
                if (imports.pointer.get(RecebeJson, `${CaminhoTabela}w:tblStyle/0/$/w:val`).length > 0) {
                    let estiloTabela = imports.pointer.get(RecebeJson, `${CaminhoTabela}w:tblStyle/0/$/w:val`)
                    let altTabela = ''
                    let descricaoTabela = ''
                    if (imports.pointer.has(RecebeJson, `${CaminhoTabela}w:tblCaption/0/$/w:val`))
                        altTabela = imports.pointer.get(RecebeJson, `${CaminhoTabela}w:tblCaption/0/$/w:val`)
                    if (imports.pointer.has(RecebeJson, `${CaminhoTabela}w:tblDescription/0/$/w:val`))
                        descricaoTabela = imports.pointer.get(RecebeJson, `${CaminhoTabela}w:tblDescription/0/$/w:val`)

                    imports.tratativaClass.incrementaSeguenciaMidias()
                    imports.classDocument.inserirTabelas(
                        imports.tratativaClass.seguenciaMidias,
                        null,
                        estiloTabela,
                        altTabela,
                        descricaoTabela,
                        null
                    )
                    this.ExtrairEstruturaTabelas(RecebeJson, i, imports.tratativaClass.seguenciaMidias)
                }
            } catch (e) { }
        }
    },
    ExtrairEstruturaTabelas(RecebeJson, i, seguenciaTabela) {
        let fonteTexto = ''
        let tamanhoFonte = ''
        let corFonte = ''
        let corFundo = ''
        for (let t = 0; t < imports.pointer.get(RecebeJson, `/w:document/w:body/0/w:tbl/${i}/w:tr`).length; t++) {
            for (let t2 = 0; t2 < imports.pointer.get(RecebeJson, `/w:document/w:body/0/w:tbl/${i}/w:tr/${t}/w:tc`).length; t2++) {
                fonteTexto = ''
                tamanhoFonte = ''
                corFonte = ''
                corFundo = ''

                if (imports.pointer.has(RecebeJson, `/w:document/w:body/0/w:tbl/${i}/w:tr/${t}/w:tc/${t2}/w:p/0/w:r/0/w:rPr/0/w:rFonts/0/$/w:hAnsi`))
                    fonteTexto = imports.pointer.get(RecebeJson, `/w:document/w:body/0/w:tbl/${i}/w:tr/${t}/w:tc/${t2}/w:p/0/w:r/0/w:rPr/0/w:rFonts/0/$/w:hAnsi`)
                if (imports.pointer.has(RecebeJson, `/w:document/w:body/0/w:tbl/${i}/w:tr/${t}/w:tc/${t2}/w:p/0/w:r/0/w:rPr/0/w:sz/0/$/w:val`))
                    tamanhoFonte = imports.pointer.get(RecebeJson, `/w:document/w:body/0/w:tbl/${i}/w:tr/${t}/w:tc/${t2}/w:p/0/w:r/0/w:rPr/0/w:sz/0/$/w:val`) / 2
                if (imports.pointer.has(RecebeJson, `/w:document/w:body/0/w:tbl/${i}/w:tr/${t}/w:tc/${t2}/w:p/0/w:r/0/w:rPr/0/w:color/0/$/w:val`))
                    corFonte = imports.pointer.get(RecebeJson, `/w:document/w:body/0/w:tbl/${i}/w:tr/${t}/w:tc/${t2}/w:p/0/w:r/0/w:rPr/0/w:color/0/$/w:val`)
                if (imports.pointer.has(RecebeJson, `/w:document/w:body/0/w:tbl/${i}/w:tr/${t}/w:tc/${t2}/w:p/0/w:r/0/w:rPr/0/w:highlight/0/$/w:val`))
                    corFundo = imports.pointer.get(RecebeJson, `/w:document/w:body/0/w:tbl/${i}/w:tr/${t}/w:tc/${t2}/w:p/0/w:r/0/w:rPr/0/w:highlight/0/$/w:val`)

                //console.log(fonteTexto + ' - ' + tamanhoFonte + ' - ' + corFonte + ' - ' + corFundo + ' - ' + seguenciaTabela)
                // Inserir objeto EstrutraTabela
            }
        }
    },
    ExtrairTextos(RecebeJson, PosicaoI, PosicaoJ) {
        let caminhoTextoWr = `/w:document/w:body/0/w:p/${PosicaoI}/w:r/${PosicaoJ}/`
        let caminhoTextoWpr = `/w:document/w:body/0/w:p/${PosicaoI}/w:pPr/0/`

        if (imports.baseWord.ehTexto(RecebeJson, caminhoTextoWpr, caminhoTextoWr)) {
            let RecebeDadosTexto = imports.pointer.get(RecebeJson, `${caminhoTextoWr}w:t/0`)
            imports.tratativaClass.extrairQtdCaracteres(RecebeDadosTexto)
            if (imports.tratativaClass.qtdCaracteres > 0) {
                let corDaFonte = '000000'
                let tamanhoDaFonte = 11
                let tipoDaFonte = 'Calibri (Corpo)'
                let corDeFundo = 'transparent'
                let titulo = 'Normal'
                let alinhamentoTexto = 'left'

                if (imports.pointer.has(RecebeJson, `${caminhoTextoWr}w:rPr/0/w:color/0/$/w:val`))
                    corDaFonte = imports.pointer.get(RecebeJson, `${caminhoTextoWr}w:rPr/0/w:color/0/$/w:val`)
                if (imports.pointer.has(RecebeJson, `${caminhoTextoWr}w:rPr/0/w:sz/0/$/w:val`))
                    tamanhoDaFonte = imports.pointer.get(RecebeJson, `${caminhoTextoWr}w:rPr/0/w:sz/0/$/w:val`) / 2
                if (imports.pointer.has(RecebeJson, `${caminhoTextoWr}w:rPr/0/w:rFonts/0/$/w:hAnsi`))
                    tipoDaFonte = imports.pointer.get(RecebeJson, `${caminhoTextoWr}w:rPr/0/w:rFonts/0/$/w:hAnsi`)
                if (imports.pointer.has(RecebeJson, `${caminhoTextoWr}w:rPr/0/w:highlight/0/$/w:val`))
                    corDeFundo = imports.pointer.get(RecebeJson, `${caminhoTextoWr}w:rPr/0/w:highlight/0/$/w:val`)
                if (imports.pointer.has(RecebeJson, `${caminhoTextoWpr}w:pStyle/0/$/w:val`)) {
                    titulo = imports.pointer.get(RecebeJson, `${caminhoTextoWpr}w:pStyle/0/$/w:val`)
                    for (let s = 0; s < imports.classStyle.style.length; s++) {
                        if (imports.classStyle.style[s].titulo === titulo) {
                            tipoDaFonte = imports.classStyle.style[s].nomeFonte
                        }
                    }
                }
                if (imports.pointer.has(RecebeJson, `${caminhoTextoWpr}w:jc/0/$/w:val`))
                    alinhamentoTexto = imports.pointer.get(RecebeJson, `${caminhoTextoWpr}w:jc/0/$/w:val`)

                imports.tratativaClass.incrementaSeguenciaMidias()
                imports.classDocument.inserirTextos(
                    imports.tratativaClass.seguenciaMidias,
                    imports.tratativaClass.seguenciaMidias,
                    RecebeDadosTexto,
                    imports.tratativaClass.qtdCaracteres,
                    corDaFonte,
                    tamanhoDaFonte,
                    tipoDaFonte,
                    corDeFundo,
                    titulo,
                    alinhamentoTexto
                )
            }
        }
    },
    ExtrairVideos(RecebeJson, PosicaoI, PosicaoJ) {
        let caminhoVideo = `/w:document/w:body/0/w:p/${PosicaoI}/w:r/${PosicaoJ}/w:drawing/0/wp:inline/0/`

        if (imports.baseWord.ehVideo(RecebeJson, caminhoVideo)) {
            let RecebeDadosVideo = imports.pointer.get(RecebeJson, `${caminhoVideo}wp:docPr/0`)
            let RecebeDadosVideoFrame = imports.pointer.get(RecebeJson, `${caminhoVideo}a:graphic/0/a:graphicData/0/pic:pic/0/pic:blipFill/0/a:blip/0/a:extLst/0/a:ext/1/wp15:webVideoPr/0/$`)

            imports.baseWord.extrairLegenda(RecebeJson, PosicaoI)
            imports.tratativaClass.incrementaSeguenciaMidias()
            imports.classDocument.inserirVideos(
                imports.tratativaClass.seguenciaMidias,
                RecebeDadosVideo.$.id,
                RecebeDadosVideo.$.title,
                RecebeDadosVideo.$.descr,
                RecebeDadosVideo.$.name,
                RecebeDadosVideoFrame,
                imports.baseWord.legenda
            )
        }
    },
    ExtrairStyle(pastaTemporaria) {
        const arquivoTempJson2 = `${pastaTemporaria}/tempStyle.json`
        imports.baseDocument.ReadFileWithXml(`${pastaTemporaria}/word/styles.xml`, (err) => {
            imports.parser.parseString(err, (err, result) => {
                parsedData = JSON.stringify(result)

                imports.jsonfile.writeFile(arquivoTempJson2, parsedData, function (err) {
                    imports.jsonfile.readFile(arquivoTempJson2, function (err, obj) {
                        const jsonData = JSON.parse(obj)
                        let TotalStyle = imports.pointer.get(jsonData, `/w:styles/w:style`).length
                        for (let i = 0; i < TotalStyle; i++) {
                            if ((imports.pointer.has(jsonData, `/w:styles/w:style/${i}/$/w:styleId`)) &&
                                (imports.pointer.has(jsonData, `/w:styles/w:style/${i}/w:rPr/0/w:rFonts/0/$/w:hAnsi`))) {

                                console.log(
                                    imports.pointer.get(jsonData, `/w:styles/w:style/${i}/$/w:styleId`),
                                    imports.pointer.get(jsonData, `/w:styles/w:style/${i}/w:rPr/0/w:rFonts/0/$/w:hAnsi`))

                                imports.classStyle.inserirStyle(
                                    imports.pointer.get(jsonData, `/w:styles/w:style/${i}/$/w:styleId`),
                                    imports.pointer.get(jsonData, `/w:styles/w:style/${i}/w:rPr/0/w:rFonts/0/$/w:hAnsi`)
                                )
                            }
                        }
                    })
                })
            })
        })
        return true
    }
}
function InserirGrafico(RecebeJson, PosicaoI, caminhoGrafico) {
    let RecebeDadosGraficos = imports.pointer.get(RecebeJson, `${caminhoGrafico}/0`)
    imports.baseWord.extrairLegenda(RecebeJson, PosicaoI)
    imports.tratativaClass.incrementaSeguenciaMidias()
    imports.classDocument.inserirGraficos(
        imports.tratativaClass.seguenciaMidias,
        RecebeDadosGraficos.$.id,
        null,
        RecebeDadosGraficos.$.title,
        RecebeDadosGraficos.$.descr,
        RecebeDadosGraficos.$.name,
        imports.baseWord.legenda
    )
    //ExtrairEstruturaGraficos(imports.tratativaClass.seguenciaMidias)
}
function ExtrairEstruturaGraficos(seguenciaGrafico) {
    imports.baseWord.totalGrafico++
    let totalGrafico = imports.baseWord.totalGrafico
    const pastaTemporaria = `${imports.tratativaClass.RemoverPastaTemporaria}/`
    const arquivoTempJson = `${pastaTemporaria}tempCharts${totalGrafico}.json`
    const wordDocument = `${pastaTemporaria}ionic2.docx/word/charts/chart${totalGrafico}.xml`
    console.log(wordDocument)
    imports.baseDocument.ReadFileWithXml(wordDocument, retorno => {
        imports.parser.parseString(retorno, (retorno, result) => {
            parsedData = JSON.stringify(result)

            imports.jsonfile.writeFile(arquivoTempJson, parsedData, function (retorno) {
                imports.jsonfile.readFile(arquivoTempJson, function (retorno, obj) {
                    console.log('Antes ')
                    const jsonData = JSON.parse(obj)
                    console.log('Depois')

                    if (imports.pointer.has(jsonData, '/c:chartSpace/c:chart/0/c:plotArea/0/c:barChart/0/c:ser/0/c:tx/0/c:strRef/0/c:strCache/0/c:pt/0/c:v/0')) {
                        let totalSer = imports.pointer.get(jsonData, '/c:chartSpace/c:chart/0/c:plotArea/0/c:barChart/0/c:ser').length
                        for (let tSer = 0; tSer < totalSer; tSer++) {
                            console.log('Titulo: ' + imports.pointer.get(jsonData, `/c:chartSpace/c:chart/0/c:plotArea/0/c:barChart/0/c:ser/${tSer}/c:tx/0/c:strRef/0/c:strCache/0/c:pt/0/c:v/0`))
                        }
                    }

                    console.log(imports.pointer.get(jsonData, '/c:chartSpace/c:chart/0/c:title/0/c:txPr/0/a:bodyPr/0/$/vertOverflow'))

                    if (imports.pointer.has(jsonData, '/c:chartSpace/c:chart/0/c:plotArea/0/c:pieChart/0/c:ser/0/c:tx/0/c:strRef/0/c:strCache/0/c:pt/0/c:v/0'))
                        console.log('Titulo: ' + imports.pointer.get(jsonData, '/c:chartSpace/c:chart/0/c:plotArea/0/c:pieChart/0/c:ser/0/c:tx/0/c:strRef/0/c:strCache/0/c:pt/0/c:v/0'))
                    if (imports.pointer.has(jsonData, '/c:chartSpace/c:chart/0/c:plotArea/0/c:pieChart/0/c:ser/0/c:cat/0/c:strRef/0/c:strCache/0/c:ptCount/0/$/val')) {
                        let totalCat = (imports.pointer.get(jsonData, '/c:chartSpace/c:chart/0/c:plotArea/0/c:pieChart/0/c:ser/0/c:cat/0/c:strRef/0/c:strCache/0/c:ptCount/0/$/val'))
                        for (let tCat = 0; tCat < totalCat; tCat++) {
                            console.log('Titulos: ' + imports.pointer.get(jsonData, `/c:chartSpace/c:chart/0/c:plotArea/0/c:pieChart/0/c:ser/0/c:cat/0/c:strRef/0/c:strCache/0/c:pt/${tCat}/c:v/0`))
                        }
                    }
                    if (imports.pointer.has(jsonData, '/c:chartSpace/c:chart/0/c:plotArea/0/c:pieChart/0/c:ser/0/c:val/0/c:numRef/0/c:numCache/0/c:ptCount/0/$/val')) {
                        let totalVat = (imports.pointer.get(jsonData, '/c:chartSpace/c:chart/0/c:plotArea/0/c:pieChart/0/c:ser/0/c:val/0/c:numRef/0/c:numCache/0/c:ptCount/0/$/val'))
                        for (let tVal = 0; tVal < totalVat; tVal++) {
                            console.log(imports.pointer.get(jsonData, `/c:chartSpace/c:chart/0/c:plotArea/0/c:pieChart/0/c:ser/0/c:val/0/c:numRef/0/c:numCache/0/c:pt/${tVal}/c:v/0`))
                        }
                    }
                })
            })
        })
    })
}