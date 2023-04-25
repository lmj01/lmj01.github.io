const rootRelative = location.pathname;
const rootOrigin = location.origin;
// 测试
document.getElementById('content').innerHTML = marked.parse('# Marked in the browser\n\nRendered by **marked**.');

function updateContent(text) {
    document.getElementById('content').innerHTML = marked.parse(text);
    document.querySelectorAll('.main-content a').forEach(a=>tagLinkUpdateEvent(a));
}

const patternExternal = /^(https?:|mailto:|tel:)/
function tagLinkClickCaption(event, aLink) {
    event.stopPropagation();
    event.preventDefault();
    const isSameOrigin = aLink.href.startsWith(rootOrigin) && aLink.href.endsWith('.md');
    if (isSameOrigin) {
        // 只解析本地的markdown文件
        const tmp = `${rootRelative}${aLink.href.replace(rootOrigin,'').replace(rootRelative, '').replace('//', '/')}`;    
        fetch(tmp)
            .then(res=>res.text()).then(text=>updateContent(text));
    } else {
        window.open(aLink.href);
    }
}

function tagLinkUpdateEvent(aLink) {
    aLink.removeEventListener('click', tagLinkClickCaption);
    aLink.addEventListener('click', (event)=> tagLinkClickCaption(event, aLink), false);
}

// 获取所有
document.querySelectorAll('.side-left a').forEach(a => tagLinkUpdateEvent(a));