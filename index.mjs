import { md2Html } from './libs/marked/mj-marked.mjs';
import hljs from './highlight/core.min.mjs';
import languageJavascript from './highlight/languages/javascript.min.mjs';
import languageLua from './highlight/languages/lua.min.mjs';
import languageCpp from './highlight/languages/cpp.min.mjs';

hljs.registerLanguage('javascript', languageJavascript);
hljs.registerLanguage('lua', languageLua);
hljs.registerLanguage('cpp', languageCpp);

const rootRelative = location.pathname;
const rootOrigin = location.origin;
const ud = {
    cacheUrls: [],
};
// 测试
document.getElementById('content').innerHTML = md2Html('# Marked in the browser\n\nRendered by **marked**.');
const elBtnBack = document.createElement('button');
elBtnBack.classList.add('btn', 'btn-primary', 'position-absolute', 'top-0', 'end-0', 'mt-3', 'me-3');
elBtnBack.textContent = 'Back';
elBtnBack.addEventListener('click', ()=>{
    console.log(ud.cacheUrls)
    ud.cacheUrls.pop();
    if (ud.cacheUrls.length > 0) {
        const elTag = document.createElement('a');
        elTag.href = ud.cacheUrls.pop();
        tagLinkClickCaption(null, elTag)
    }
})
function updateContent(text, options = {}) {
    const elContent = document.getElementById('content');
    elContent.classList.add('position-relative');
    if (options.isLink) {
        elContent.classList.add('iframe')
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
        elContent.classList.remove('iframe');
        const ext = options.ext || 'md';
        if (ext == 'md') {
            const elDiv = document.createElement('div');
            elDiv.classList.add('w-100','h-100','d-flex','flex-column');
            elDiv.innerHTML = md2Html(text);
            elContent.replaceChildren();
            elContent.appendChild(elDiv);
        } else {
            const fixed = {js:'javascript', lua:'lua', cpp:'cpp'};
            const res = hljs.highlight(text, {language:fixed[ext]});
            const elPre = document.createElement('pre');
            const elCode = document.createElement('pre');
            elCode.innerHTML = res.value;
            elPre.appendChild(elCode);
            elContent.replaceChildren();
            elContent.appendChild(elPre);
        }
        catchAllTagLink();
    }
    elContent.appendChild(elBtnBack);
}

const patternExternal = /^(https?:|mailto:|tel:)/
function tagLinkClickCaption(event, aLink) {
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    console.log('22click', event, aLink, aLink.href)
    const strHref = aLink.href;
    ud.cacheUrls.push(strHref);
    const ext = strHref.substring(strHref.lastIndexOf('.') + 1);
    const isSameOrigin = strHref.startsWith(rootOrigin) && ['md','js','cpp','lua'].includes(ext);
    if (isSameOrigin) {        
        // 只解析本地的markdown文件
        const tmp = `${rootRelative}${strHref.replace(rootOrigin,'').replace(rootRelative, '').replace('//', '/')}`;    
        fetch(tmp).then(res=>res.text()).then(text=>updateContent(text, {ext: ext}));
    } else {
        /**
         * 不调整，还是留着当前页面内
         */
        updateContent(strHref, {isLink:true})
    }
}

function tagLinkUpdateEvent(aLink) {
    aLink.removeEventListener('click', tagLinkClickCaption);
    aLink.addEventListener('click', (event)=> tagLinkClickCaption(event, aLink), false);
}
function catchAllTagLink() {
    document.querySelectorAll('a').forEach(a => tagLinkUpdateEvent(a));
}
// 获取所有
ud.cacheUrls = [];
catchAllTagLink();
fetch('/articles/demo.md').then(res=>res.text()).then(text=>{
    document.getElementById('content').innerHTML = md2Html(text);
})