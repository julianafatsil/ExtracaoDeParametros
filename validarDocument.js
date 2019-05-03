let extratorDoc = require('docx-extractor');

function ExtratorWord(filename){ 

    extratorDoc.timeCreated(filename, function (ImageData) {
        console.log(ImageData )
    });
}






