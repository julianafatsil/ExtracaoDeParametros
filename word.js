var fs = require('fs');
const path = require('path');
var fse = require('fs-extra');
var unzip = require('unzip');
var xml2js = require('xml2js');
var jsonfile = require('jsonfile');
var pointer = require('json-pointer');
var parser = new xml2js.Parser()

exports.templateUsed = function(filepath, callback){

    if(filepath.indexOf(".docx")>-1){
                var filename = path.basename(filepath);
                var newFile = filename+'.zip';
                fse.copy(filepath, __dirname+'/tmp/'+filename, function(err){
                    fs.rename(__dirname+'/tmp/'+filename, __dirname+'/tmp/'+newFile, function(err) {
                        fs.createReadStream(__dirname+'/tmp/'+newFile).pipe(unzip.Extract({ path: __dirname+'/tmp/'+filename})).on('close', function () {
                            fs.readFile(__dirname + '/tmp/'+filename+'/docProps/app.xml', function(err, data) {
                                 if(err){
                                    
                                    return console.log("This document does not appear to specify the template used in its xml");
                                
                                } else{
                                    parser.parseString(data, function (err, result) {

                                        parsedData = JSON.stringify(result);
                                        var file = __dirname+'/tmp/temp.json';
                                        jsonfile.writeFile(file, parsedData, function(err){
                                            jsonfile.readFile(file, function(err, obj) {
                                                var jsonData = JSON.parse(obj);
                                                

                                                try{
                                                    var templateUsed = pointer.get(jsonData, '/Properties/Template');
                                                    fse.emptyDir(__dirname+'/tmp/', function(err){
                                                        return callback(templateUsed[0]);
                                                    });
                                                     
                                                }catch(e){
                                                    
                                                    return console.log("Error occured trying to get the template used. If you are seeing this error and cannot resolve the issue, you can open an issue on the Github page");
                                                 }
                                                
                                            });
                                        });

                                    });
                                }
                            });
                        });
                    });
                });
                
          } else {
          return console.log("Can't get the template used. The file you are passing into the function is not a 'docx' file");
      }
}
