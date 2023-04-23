document.getElementById('content').innerHTML =
      marked.parse('# Marked in the browser\n\nRendered by **marked**.');

function updateContent(text) {
    document.getElementById('content').innerHTML = marked.parse(text);
    document.querySelectorAll('.main-content a').forEach(a=>tagLinkUpdateEvent(a));
}

function tagLinkClickCaption(event, aLink) {
    event.stopPropagation();
    event.preventDefault();
    fetch(aLink.href).then(res=>res.text()).then(text=>updateContent(text));
}

function tagLinkUpdateEvent(aLink) {
    aLink.removeEventListener('click', tagLinkClickCaption);
    aLink.addEventListener('click', (event)=> tagLinkClickCaption(event, aLink), false);
}

// 获取所有
document.querySelectorAll('.side-left a').forEach(a => {
    console.log('side-left', a)
    tagLinkUpdateEvent(a)
});