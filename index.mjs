const rootRelative = location.pathname;
const rootOrigin = location.origin;
// 测试
document.getElementById('content').innerHTML = marked.parse('# Marked in the browser\n\nRendered by **marked**.');

function updateContent(text, options = {}) {
    const elContent = document.getElementById('content');
    if (options.isLink) {
        const elIframe = document.createElement('iframe');
        elIframe.src = text;
        elIframe.width = '100%';
        elIframe.height = '100vh';
        elIframe.onload = function() {
            this.setAttribute('height', 'auto');
            this.setAttribute('height', '2000px');
        }
        elIframe.style.height = '100vh';
        elIframe.style.border = 'none';
        elIframe.style.overflow = 'auto';
        elContent.replaceChildren();
        elContent.appendChild(elIframe);
    } else {
        elContent.innerHTML = marked.parse(text);
        document.querySelectorAll('.main-content a').forEach(a=>tagLinkUpdateEvent(a));
    }
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
        // window.open(aLink.href);
        /**
         * 不调整，还是留着当前页面内
         */
        updateContent(aLink.href, {isLink:true})
    }
}

function tagLinkUpdateEvent(aLink) {
    aLink.removeEventListener('click', tagLinkClickCaption);
    aLink.addEventListener('click', (event)=> tagLinkClickCaption(event, aLink), false);
}

// 获取所有
document.querySelectorAll('.side-menu a').forEach(a => tagLinkUpdateEvent(a));