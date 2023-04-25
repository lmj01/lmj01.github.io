window.MathJax = {
    tex: {
        // inlineMath: [['$', '$'], ['\\(', '\\)']],
        packages: {'[+]': ['color']}, // use the special '[+]' notation to append it to the default packages
        tags: 'all' // 达标记
    },
    svg: {
        fontCache: 'global'
    },
    loader: {
        load: ['input/tex-base', 'output/svg', 'ui/menu', '[tex]/require']
    },
    startup: {
        ready: () => {
            console.log('MathJax is loaded, but not yet initialized');
            MathJax.startup.defaultReady();
            console.log('MathJax is initialized, and the initial typeset is queued');
        },
    },
};
(function () {
    var script = document.createElement('script');
    script.id = 'MathJax-script';
    script.src = './es5/tex-chtml-full.js';
    script.async = true;
    document.head.appendChild(script);
})();