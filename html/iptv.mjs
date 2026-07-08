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
            const s11 = s1.substring(11)?.replaceAll('\r', '').split(',');
            if (s11[0]) data.id = s11[0].replaceAll('"', '').split('=')[1];
            if (s11[1]) data.label = s11[1].replaceAll('"', '')
        }
        const s2 = strList[i + 1];
        if (s2?.startsWith('http')) {
            if (s2.substring(0, 5) === 'https') {
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
        if (data.path) data.path = data.path.replaceAll('\r', '');
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
                const tmp = json.tree.filter(e => e.id === subName[0])[0];
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
// 在加载播放器之前，先发送 HEAD/GET 请求验证 URL 可访问
async function validateHLSUrl(url) {
    try {
        const response = await fetch(url, { method: 'HEAD', mode: 'cors' });

        // 1. 检查 HTTP 状态码
        if (!response.ok) {
            return { valid: false, reason: `HTTP ${response.status} - ${response.statusText}` };
        }

        // 2. 检查 Content-Type
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('mpegurl')) {
            return { valid: false, reason: `错误的 MIME 类型: ${contentType}` };
        }

        // 3. 检查内容是否为空
        const contentLength = response.headers.get('content-length');
        if (contentLength === '0') {
            return { valid: false, reason: 'M3U8 文件内容为空' };
        }

        return { valid: true };
    } catch (error) {
        return { valid: false, reason: `网络错误: ${error.message}` };
    }
}
// 即使 HTTP 200，M3U8 文件本身可能无效。需要解析内容
async function parseM3U8Content(url) {
    const response = await fetch(url);
    const text = await response.text();

    // 1. 检查是否以 #EXTM3U 开头
    if (!text.trim().startsWith('#EXTM3U')) {
        return { valid: false, reason: '不是有效的 M3U8 文件（缺少 #EXTM3U 标记）' };
    }

    // 2. 检查是否包含媒体分片或子播放列表
    const hasSegments = text.includes('#EXTINF') || text.includes('#EXT-X-STREAM-INF');
    if (!hasSegments) {
        return { valid: false, reason: 'M3U8 文件中未找到有效的媒体分片或码率信息' };
    }

    // 3. 检查是否是 Master Playlist（多码率）
    const isMaster = text.includes('#EXT-X-STREAM-INF');

    // 4. 检查是否是空直播流（没有 #EXT-X-ENDLIST 且没有分片）
    if (!text.includes('#EXT-X-ENDLIST') && !isMaster) {
        const segmentCount = (text.match(/#EXTINF/g) || []).length;
        if (segmentCount === 0) {
            return { valid: false, reason: '直播流暂无可用分片' };
        }
    }

    return { valid: true, isMaster, content: text };
}
async function addInfo() {
    const json = await readJsonFile('./iptv.json');
    const validIds = [];
    for (let i = 0; i < json.tree.length; i++) {
        const d0 = json.tree[i];
        // if ([
        //     'cn',
        //     'uk', 'us',
        // ].includes(d0.id)) {
            for (let j = 0; j < d0.data.length; j++) {
                const one = d0.data[j];
                try {
                    const ret1 = await validateHLSUrl(one.path);
                    if (ret1.valid) {
                        const ret2 = await parseM3U8Content(one.path);
                        if (ret2.valid) {
                            one.valid = ret2.valid;
                            validIds.push(one.id);
                        } else {
                            console.log('m3u8', d0.id, ret2.reason);
                        }
                    } else {
                        console.log('url check ', d0.id, ret1.reason);
                    }
                } catch (err) {
                    console.log('error',d0.id, err.message);
                }
            }
        // }
    }
    await writeJsonFile(json, './iptv.json');
    console.log(validIds);
}
async function run() {
    // await getStreamsInfo();  
    addInfo();
}
run().catch(err => {
    console.error(err);
})


