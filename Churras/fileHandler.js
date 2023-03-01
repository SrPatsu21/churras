//call vars
var fs = require(`fs`).promises;
//setting functions and class
    class File{
        constructor(dir){
            this.dir = dir;
        }
    }
    getFile = (dir) => {
        return fs.readFile(dir)
    }
    acessFile = (dir) => {
        return fs.access(dir, fs.constants.R_OK)
        .then(() => true).catch(() => false);
    }
    //export
    exports.File = new File;
    exports.getFile = getFile();
    exports.acessFile = acessFile();