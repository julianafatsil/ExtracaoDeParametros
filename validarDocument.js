let extratorDoc = require('docx-extractor');

function EhDocWord(extensaoArq){
    return extensaoArq == 'DOCX';
}

function EhDocPdf(extensaoArq){
    return extensaoArq == 'PDF';
}

function EhDocEpub(extensaoArq){
    return extensaoArq == 'EPUB';
}

function ValidarEhDocumentoExtraivel(extensaoArq){
    return EhDocPdf(extensaoArq) || EhDocWord(extensaoArq) || EhDocEpub(extensaoArq);
}

function ExtrairExtensao(filename){
    return  filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2).toUpperCase();
}

function ExecutarExatracaoArquivo(filename) {
    let extArq = ExtrairExtensao(filename);
    
    if (ValidarEhDocumentoExtraivel(extArq)){
        console.log('Arquivo OK ' + extArq);

        if(EhDocWord(extArq)){

            ExtratorWord(filename);

        } else if(EhDocPdf(extArq)){
            
            console.log('É documento pdf');
            ExtratorPdf(filename);

        }else if(EhDocEpub(extArq)){
            console.log('É documento epub');
        }
    } else {
        console.log('Extensão de arquivo é inválida! ' + extArq);
    }
}

function ExtratorWord(filename){
   

    extratorDoc.timeCreated(filename, function (ImageData) {
        console.log(ImageData )
    });
}

function ExtratorPdf(filename){
    const PDFExtract = require('pdf.js-extract').PDFExtract;
    const pdfExtract = new PDFExtract();
    const options = {}; 

    pdfExtract.extract(filename, options, (err, data) => {
        if (err){ 
            return console.log(err);
        } else {
            DadosArquivos.TipoDoc = 'PDF';
            DadosArquivos.Version = data.meta.info.PDFFormatVersion;
            DadosArquivos.Title = data.meta.info.Title;
            DadosArquivos.Author = data.meta.info.Author;
            DadosArquivos.Subject = data.meta.info.Subject;
            DadosArquivos.Keywords = data.meta.info.Keywords;
            DadosArquivos.Creator = data.meta.info.Creator;
            DadosArquivos.Producer = data.meta.info.Producer;
            DadosArquivos.CreationData = data.meta.info.CreationDate;
            DadosArquivos.ModDate = data.meta.info.ModDate;

            DadosArquivos.pageInfo = data.pages[1].pageInfo;
            DadosArquivos.content = data.pages[1].content;
        }
            console.log(DadosArquivos)
            // console.log(data.pages[1].pageInfo);
    })
}

let DadosArquivos = {}





