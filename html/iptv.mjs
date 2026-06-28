import fs from 'fs/promises';
import path from 'path';


const json = {};

async function parseM3uFiles(path, one) {
    const str = await readStringFile(path);
    const strList = str.split('\n');
    for (let i = 1; i < strList.length;) {
        const data = { code: 0 };
        const s1 = strList[i];
        if (s1?.startsWith('#EXTINF')) {
            const s11 = s1.substring(11)?.replaceAll('\r','').split(',');
            if (s11[0]) data.id = s11[0].replaceAll('"','').split('=')[1];
            if (s11[1]) data.label = s11[1].replaceAll('"','')
        }
        const s2 = strList[i + 1];
        if (s2?.startsWith('http')) {
            if (s2.substring(0,5)==='https') {
                data.code = 1;
            } else {
                data.tip = 'no https, may not worked';
            }
            data.path = s2;
            i += 2;
        } else {
            if (s2?.startsWith('#')) {
                console.log(s2.substring(12));
                const s3 = strList[i + 2];
                if (s3?.startsWith('https')) {
                    data.path = s3;
                } else {
                    console.error('un-handle - 1', data.id, s2, s1);
                }
            } else {
                console.log('un-handle - 2', data.id, s2, s1);
            }
            i += 3;
        }
        if (data.path) data.path = data.path.replaceAll('\r','');
        if (data.code !== 0 && data.path) one.data.push(data);
    }
    console.log(path);
}
function extRemove(str) {
    return str.substring(0, str.lastIndexOf('.'));
}
function extGet(str) {
    return str.slice(str.lastIndexOf('.')).toLowerCase();
}
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
async function writeJsonFile(obj, path) {
    try {
        const jsonContent = JSON.stringify(obj, null, 2);
        await fs.writeFile(path, jsonContent, 'utf8');
    } catch (err) {
        console.error(`写入 JSON 文件失败:`, err.message);
    }
}
async function readFile(path) {
    return await fs.readFile(path);
}
async function readJsonFile(path) {
    return JSON.parse(await readStringFile(path));
}
async function readStringFile(path) {
    const buffer = await readFile(path);
    return buffer.toString();
}

async function traverseDirectoryJson(json, dir, rootDir = dir, level = 1) {
    if (!json.tree) json.tree = [];
    try {
        // 读取目录中的所有文件/子目录
        const entries = await fs.readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
            // 拼接完整路径
            const fullPath = path.join(dir, entry.name);
            const subPaths = fullPath.split('/');
            if (entry.isDirectory()) {
                await traverseDirectoryJson(json, fullPath, rootDir, level++);
            } else if (entry.isFile()) {
                const relativePath = path.relative(rootDir, fullPath);
                const normalizedPath = relativePath.replace(/\\/g, '/');
                const ext = extGet(normalizedPath);
                const name = extRemove(normalizedPath);
                const subName = name.split('_');
                const tmp = json.tree.filter(e=>e.id === subName[0])[0]; 
                const one = { id: subName[0], data: [], children: [] };
                if (tmp === undefined) {
                    json.tree.push(one);
                } else {
                    if (subName.length > 1) {
                        one.id = subName[1];
                        tmp.children.push(one);
                    }
                }
                // if (['cn'].includes(subName[0]))
                await parseM3uFiles(fullPath, one);
                //if (['.m3u'].includes(ext))json.tree.push(normalizedPath);
            }
        }
    } catch (err) {
        console.error(`visit tree folder error: ${dir}`, err.message);
    } finally {
        return json;
    }
}
async function getStreamsInfo() {
    const tree = {};
    const relativePath = '../../iptv/streams';
    try {
        await traverseDirectoryJson(tree, relativePath);
    } finally {
        // console.log(tree);
        await writeJsonFile(tree, './iptv.json');
    }
}
async function run () {
    await getStreamsInfo();
}
run().catch(err=>{
    console.error(err);
})


