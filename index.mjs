import { md2Html, parseMermaidHtml } from './libs/marked/index.js';
import hljs from './libs/highlight/core.min.mjs';
import languageJavascript from './libs/highlight/languages/javascript.min.mjs';
import languageLua from './libs/highlight/languages/lua.min.mjs';
import languageCpp from './libs/highlight/languages/cpp.min.mjs';
import languageC from './libs/highlight/languages/c.min.mjs';
import languageGlsl from './libs/highlight/languages/glsl.min.mjs';
import { whiteListUrls } from './config.mjs';

hljs.registerLanguage('javascript', languageJavascript);
hljs.registerLanguage('lua', languageLua);
hljs.registerLanguage('cpp', languageCpp);
hljs.registerLanguage('c', languageC);
hljs.registerLanguage('glsl', languageGlsl);

const whiteListToNewTab = Object.keys(whiteListUrls).map(e=>whiteListUrls[e].url);
const cInitPath = '/articles/demo.md';

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
            await toHtmlData(elContent, text, options);
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

async function toHtmlData(elContent, text, options = {}) {
    const elDiv = document.createElement('div');
    let uniqueClass = '';
    if (options.relativePath) {
        uniqueClass = options.relativePath.replace(/\/index\//g,'').replace(/.md$/g, '').replaceAll('/','-').toLowerCase();
        if (['/','-'].includes(uniqueClass[0])) uniqueClass = uniqueClass.substring(1);
    }    
    elDiv.classList.add('w-100','h-100','d-flex','flex-column', 'container');
    if (uniqueClass.length > 0) elDiv.classList.add(`mj-${uniqueClass}`);
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

function initWhiteList() {
    document.body.querySelectorAll('.navbar-nav .nav-item').forEach(elLi=>{
        if (elLi.children.length > 0) {
            const aLink = elLi.children[0];
            if (!aLink.href) {
                const mjcode = aLink.getAttribute('mjcode');
                if (mjcode && whiteListUrls[mjcode]) {
                    const urlItem = whiteListUrls[mjcode];
                    if (urlItem.hasTitle) {
                        aLink.setAttribute('title', urlItem.url);
                    }
                    aLink.href = urlItem.url;
                }
            }
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
                if (elLi.children.length > 0) {
                    elLi.children[0].classList.remove('active');
                }
            }
            event.target.classList.add('active');
        }
    }
    const strHref = aLink.href;
    if (location.href == strHref) {
        ud.cacheUrls.splice(0);
        initPage(cInitPath);
        return;
    }
    // console.log('tagLinkClickCaption', strHref);
    if (patternExternal.test(strHref) && whiteListToNewTab.includes(strHref)) {        
        window.open(strHref, '_blank');
        return;
    }
    ud.cacheUrls.push(strHref);
    const ext = strHref.substring(strHref.lastIndexOf('.') + 1);
    const isSameOrigin = strHref.startsWith(rootOrigin) && ['md','js','cpp','lua'].includes(ext);
    if (isSameOrigin) {        
        // 只解析本地的markdown文件
        const relativePath = `${rootRelative}${strHref.replace(rootOrigin,'').replace(rootRelative, '').replace('//', '/')}`;    
        fetch(relativePath).then(res=>res.text()).then(text=>updateContent(text, {ext: ext, relativePath}));
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
function initPage(path) {
    fetch(path).then(res=>res.text()).then(async(text)=>{
        await toHtmlData(document.getElementById('content'), text);
        catchAllTagLink();
    })    
}
// 获取所有
ud.cacheUrls = [];
initWhiteList();
catchAllTagLink();
initPage(cInitPath);


// service worker
const registerServiceWorker = async function() {
    if ('serviceWorker' in navigator) {
        try {
            const text = await fetch('/time.txt').then(res=>res.text());
            const lsText = localStorage.getItem('sw-time');
            if (lsText && lsText != text) {
                localStorage.setItem('sw-time', text);
                await caches.delete('lmj01Doc');
                // 强制刷新
                // location.reload();
            } else {
                localStorage.setItem('sw-time', text);
            }
            const registration = await navigator.serviceWorker.register('/sw.mjs', {
                scope: '/',
                type: 'module',
                shouldBypassCache: false,
            });
            registration.addEventListener('updatefound', (evt) => {
                console.log('Service worker update found:', evt);
            });
            if (registration.installing) {
                console.log('Service worker installing');
            } else if (registration.waiting) {
                console.log('Service worker installed & waiting');
            } else if (registration.active) {   
                console.log('Service worker active', registration.scope);
            }
        } catch(e) {    
            console.log('ServiceWorker registration failed: ', e);  
        }
    }
}
registerServiceWorker();