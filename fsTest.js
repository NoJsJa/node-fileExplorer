var fs = require('fs');
var stream = fs.createReadStream('./file/test.txt');
stream.on('data', function(chunk){
    console.log('readding');
    console.log(typeof (chunk));
});

stream.on('end', function(chunk){
    console.log('end');
    console.log(typeof (chunk));
});

//获取工作目录下的所有文件
var files = fs.readdirSync(process.cwd());
files.forEach(function (file) {
    //监视.txt后缀的文件
    if(/\.txt/.test(file)){
        fs.watchFile(process.cwd() + '/' + file, function () {
           console.log(' - ' + file + ' changed!');
        });
    }
});