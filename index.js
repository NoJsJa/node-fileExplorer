var fs = require('fs');
var stdin = process.stdin;
var stdout = process.stdout;
/*读取当前模块的所有文件列表*/
function async(err, files){
    console.log('');
    var stats = [];
    if(!files.length){
        return console.log('    \033[31m No files to show! \033[39m\n');
    }

    console.log('  Select which file or directory you want to see\n');

    function file(i){
        var filename = files[i];

        fs.stat('.' + '/' + filename, function(err, stat){
            stats[i] = stat;
            if(stat.isDirectory()){
                console.log('   '+ i + '    \033[36m' + filename + '/\033[39m');
            }else {
                console.log('   ' + i + '   \033[90m' + filename + '/\033[39m');
            }

            i++;
            if(i == files.length){
                console.log('');
                stdout.write('  \033[33mEnter your choice: \033[39m');
                stdin.resume();
                stdin.setEncoding('utf8');
                stdin.on('data', option);
            }else{
                file(i);
            }
        });
    }

    function option(data){
        //将utf8格式转为数字类型
        var filename = files[Number(data)];
        if(!filename){
            stdout.write('  \033[31mEnter your choice: \033[39m');
        }else{
            stdin.pause();
            if(stats[Number(data)].isDirectory()){
                fs.readdir('.' + '/' + filename, function(err, files){
                    if(err){
                        console.log(err);
                    }
                    console.log('');
                    console.log('   (' + files.length + '   files)');
                    files.forEach(function(file){
                        console.log('   -   ' + file);
                    });
                    console.log('');
                });
            }else{
            //把文件读进内存，设置编码格式
                fs.readFile('.' + '/' + filename, 'utf8', function(err, data){
                    console.log('');
                    console.log('\033[90m' + data.replace(/(.*)/g, '    $1') + '\033[39m');
                });
            }
        }
    }

    file(0);
};
//process.cwd()当前工作目录
fs.readdir(process.cwd(), async);