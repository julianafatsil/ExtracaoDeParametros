const imports = require('../imports')

exports.ExtrairDadosDocumentoWord = (RecebeJson) => {
    let TotalLinhasWP = imports.pointer.get(RecebeJson, '/w:document/w:body/0/w:p').length
    for (let i = 0; i < TotalLinhasWP; i++) {
        try {
            let TotalLinhasWR = imports.pointer.get(RecebeJson, `/w:document/w:body/0/w:p/${i}/w:r`).length
            let j = 0
            if (TotalLinhasWR > 0) {
                for (j = 0; j < TotalLinhasWR; j++) {
                    //console.log(`${i} - ${j}`)
                    //console.log(pointer.get(RecebeJson, '/w:document/w:body/0/w:p/' + i + '/w:r/' + j))

                    if ((imports.pointer.has(RecebeJson, '/w:document/w:body/0/w:p/' + i + '/w:r/' + j + '/w:drawing/0/wp:inline/0/wp:docPr/0/$/id'))
                        && (!imports.pointer.has(RecebeJson, '/w:document/w:body/0/w:p/' + i + '/w:r/' + j + '/w:drawing/0/wp:inline/0/wp:docPr/0/a:hlinkClick/0'))) {
                        let RebeceDadosImagens = imports.pointer.get(RecebeJson, '/w:document/w:body/0/w:p/' + i + '/w:r/' + j + '/w:drawing/0/wp:inline/0/wp:docPr/0')
                        imports.classDocument.inserirImagens(
                            RebeceDadosImagens.$.id,
                            RebeceDadosImagens.$.name,
                            RebeceDadosImagens.$.descr,
                            RebeceDadosImagens.$.title,
                            0
                        )
                    }

                    if ((imports.pointer.has(RecebeJson, '/w:document/w:body/0/w:p/' + i + '/w:r/' + j + '/w:drawing/0/wp:inline/0/wp:docPr/0/$/id'))
                        && (imports.pointer.has(RecebeJson, '/w:document/w:body/0/w:p/' + i + '/w:r/' + j + '/w:drawing/0/wp:inline/0/wp:docPr/0/a:hlinkClick/0'))) {
                        let RecebeDadosVideo = imports.pointer.get(RecebeJson, '/w:document/w:body/0/w:p/' + i + '/w:r/' + j + '/w:drawing/0/wp:inline/0/wp:docPr/0')
                        let RecebeDadosVideoFrame = imports.pointer.get(RecebeJson, '/w:document/w:body/0/w:p/' + i + '/w:r/' + j + '/w:drawing/0/wp:inline/0/a:graphic/0/a:graphicData/0/pic:pic/0/pic:blipFill/0/a:blip/0/a:extLst/0/a:ext/1/wp15:webVideoPr/0/$')
                        let RecebeDadosVideoLegenda = ''
                        let TotalLegendaVideo = imports.pointer.get(RecebeJson, '/w:document/w:body/0/w:p/' + (i + 1) + '/w:r').length
                        if (TotalLegendaVideo > 0) {
                            for (let k = 0; k < TotalLegendaVideo; k++) {
                                if (imports.pointer.has(RecebeJson, '/w:document/w:body/0/w:p/' + (i + 1) + '/w:r/' + k + '/w:t/0/_')) {
                                    RecebeDadosVideoLegenda = imports.pointer.get(RecebeJson, '/w:document/w:body/0/w:p/' + (i + 1) + '/w:r/6/w:t/0/_')
                                }
                            }
                        }
                        imports.classDocument.inserirVideos(
                            RecebeDadosVideo.$.id,
                            RecebeDadosVideo.$.title,
                            RecebeDadosVideo.$.name,
                            RecebeDadosVideo.$.descr,
                            RecebeDadosVideoFrame,
                            RecebeDadosVideoLegenda
                        )
                    }

                    if (imports.pointer.has(RecebeJson, '/w:document/w:body/0/w:p/' + i + '/w:r/' + j + '/mc:AlternateContent/0/mc:Choice/0/w:drawing/0/wp:inline/0/wp:docPr')) {
                        let RecebeDadosGraficos = imports.pointer.get(RecebeJson, '/w:document/w:body/0/w:p/' + i + '/w:r/' + j + '/mc:AlternateContent/0/mc:Choice/0/w:drawing/0/wp:inline/0/wp:docPr/0')
                        let RecebeDadosGraficosLegenda = ''
                        let TotalLegendaGrafico = imports.pointer.get(RecebeJson, '/w:document/w:body/0/w:p/' + (i + 1) + '/w:r').length
                        if (TotalLegendaGrafico > 0) {
                            for (let k = 0; k < TotalLegendaGrafico; k++) {
                                if (imports.pointer.has(RecebeJson, '/w:document/w:body/0/w:p/' + (i + 1) + '/w:r/' + k + '/w:t/0/_')) {
                                    RecebeDadosGraficosLegenda = imports.pointer.get(RecebeJson, '/w:document/w:body/0/w:p/' + (i + 1) + '/w:r/' + k + '/w:t/0/_')
                                }
                            }
                        }
                        imports.classDocument.inserirGraficos(
                            RecebeDadosGraficos.$.id,
                            RecebeDadosGraficosLegenda,
                            RecebeDadosGraficos.$.title,
                            RecebeDadosGraficos.$.descr,
                            RecebeDadosGraficos.$.name
                        )
                    }

                    if (imports.pointer.has(RecebeJson, '/w:document/w:body/0/w:p/' + i + '/w:r/' + j + '/w:object/0/v:shape/0')) {
                        let RecebeDadosAudios = imports.pointer.get(RecebeJson, '/w:document/w:body/0/w:p/' + i + '/w:r/' + j + '/w:object/0/v:shape/0')
                        let RecebeDadosAudiosLegenda = ''
                        let TotalLegendaAudios = imports.pointer.get(RecebeJson, '/w:document/w:body/0/w:p/' + (i + 1) + '/w:r').length
                        if (TotalLegendaAudios > 0) {
                            for (let k = 0; k < TotalLegendaAudios; k++) {
                                if (imports.pointer.has(RecebeJson, '/w:document/w:body/0/w:p/' + (i + 1) + '/w:r/' + k + '/w:t/0/_')) {
                                    RecebeDadosAudiosLegenda = imports.pointer.get(RecebeJson, '/w:document/w:body/0/w:p/' + (i + 1) + '/w:r/' + k + '/w:t/0/_')
                                }
                            }
                        }
                        imports.tratativaClass.incrementaSeguenciaAudios()
                        imports.classDocument.inserirAudios(
                            imports.tratativaClass.SeguenciaAudios,
                            RecebeDadosAudios.$.alt,
                            RecebeDadosAudios.$.style,
                            RecebeDadosAudiosLegenda
                        )
                    }
                }
            }
        } catch (e) { }
    }
    imports.extrairTabelasWord.ExtrairTabelas(RecebeJson)
}