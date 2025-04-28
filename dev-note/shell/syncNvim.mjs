import fs from 'fs';
import path from 'path';
import os from 'node:os';

function copyFolderSync(source, target) {
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target);
    }

    const files = fs.readdirSync(source);
    files.forEach(file=>{
        const sourcePath = path.join(source, file);
        const targetPath = path.join(target, file);
        if (fs.statSync(sourcePath).isDirectory()) {
            copyFolderSync(sourcePath, targetPath);
        } else {
            fs.copyFileSync(sourcePath, targetPath);
        }
    })
}

const platform = os.platform();

if (platform=='win32') {
    const targetPath = `${process.env.LOCALAPPDATA}\\nvim`;
    copyFolderSync('../nvim', `${targetPath}`);
} else {

}

