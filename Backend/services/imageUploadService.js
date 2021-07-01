const callBackResponse = require('./callBackResponseService');
const fs = require('fs');
const rename = require('rename');

module.exports.imageUpload = function (img_name, image, callBack) {
    var name = rename(img_name, function() {
        return {suffix: '-'+Date.now()};
      });
    var data_url = image;
    var matches = data_url.match(/^data:.+\/(.+);base64,(.*)$/);
    //var ext = matches[1];
    var base64_data = matches[2];
    var buffer = new Buffer(base64_data, 'base64');

     fs.writeFile("./uploads/" + name, buffer, 'binary', function (err) {
        if (err) {
            res.error = err;
        }
        else { 
            var data = {};
            data.name = name;
            callBack(callBackResponse.callbackWithData(data));
        }     
    });
}
