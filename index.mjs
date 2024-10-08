import { md2Html, parseMermaidHtml } from './libs/marked/index.js';
import hljs from './libs/highlight/core.min.mjs';
import languageJavascript from './libs/highlight/languages/javascript.min.mjs';
import languageLua from './libs/highlight/languages/lua.min.mjs';
import languageCpp from './libs/highlight/languages/cpp.min.mjs';
import languageC from './libs/highlight/languages/c.min.mjs';
import languageGlsl from './libs/highlight/languages/glsl.min.mjs';

hljs.registerLanguage('javascript', languageJavascript);
hljs.registerLanguage('lua', languageLua);
hljs.registerLanguage('cpp', languageCpp);
hljs.registerLanguage('c', languageC);
hljs.registerLanguage('glsl', languageGlsl);

const mapLanguage = {
    js: 'javascript', 
    lua: 'lua', 
    cpp: 'cpp',
    c: 'c',
    glsl: 'glsl',
};            

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
    ud.cacheUrls.pop();
    if (ud.cacheUrls.length > 0) {
        const elTag = document.createElement('a');
        elTag.href = ud.cacheUrls.pop();
        tagLinkClickCaption(null, elTag)
    }
})
async function updateContent(text, options = {}) {
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
            await toHtmlData(elContent, text);
        } else {
            const res = hljs.highlight(text, {language:mapLanguage[ext]});
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

async function toHtmlData(elContent, text) {
    const elDiv = document.createElement('div');
    elDiv.classList.add('w-100','h-100','d-flex','flex-column');
    elDiv.innerHTML = md2Html(text);
    elContent.replaceChildren();
    elContent.appendChild(elDiv);
    await parseMermaidHtml(elDiv);
    document.querySelectorAll('code').forEach(node=>{
        const lang = node.className.split('language-').pop();
        if (mapLanguage[lang]) {
            const res = hljs.highlight(node.textContent, {language:mapLanguage[lang]});    
            node.innerHTML = res.value;
        }
    });
}

const patternExternal = /^(https?:|mailto:|tel:)/
function tagLinkClickCaption(event, aLink) {
    if (event) {
        event.stopPropagation();
        event.preventDefault();
        const target = event.target.parentNode;
        if (target instanceof HTMLLIElement && target.classList.contains('nav-item')) {
            const elUl = target.parentNode;
            for (let i = 0; i < elUl.children.length; i++) {
                const elLi = elUl.children[i];
                elLi.children[0].classList.remove('active');
            }
            event.target.classList.add('active');
        }
        console.log(target, event)
    }
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
fetch('/articles/demo.md').then(res=>res.text()).then(async(text)=>{
    await toHtmlData(document.getElementById('content'), text);
    catchAllTagLink();
})