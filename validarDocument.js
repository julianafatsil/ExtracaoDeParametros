// let extratorDoc = require('docx-extractor');
import * as docx from "docx-extractor/index";
const extractorDoc = new docx;

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
        if (err) return console.log(err);
            console.log(data);
    });
}

