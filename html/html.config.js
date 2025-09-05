(function () {
    const link0 = document.createElement('link');
    link0.rel = 'icon';
    link0.href = '/favicon.ico';
    document.head.appendChild(link0);

    const link1 = document.createElement('link');
    link1.rel = 'stylesheet';
    link1.type = 'text/css';
    link1.href = '/libs/bootstrap-5.0.2-dist/bootstrap.min.css';
    document.head.appendChild(link1);

    const link2 = document.createElement('link');
    link2.rel = 'stylesheet';
    link2.type = 'text/css';
    link2.href = '/html/math.css';
    document.head.appendChild(link2);

    const script1 = document.createElement('script');
    script1.id = 'MathJax-script';
    script1.src = '/libs/bootstrap-5.0.2-dist/bootstrap.min.js';
    script1.async = true;
    document.head.appendChild(script1);
})();