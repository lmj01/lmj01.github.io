(function () {
    const link0 = document.createElement('link');
    link0.rel = 'icon';
    link0.href = '/favicon.ico';
    document.head.appendChild(link0);    

    [
        '/libs/bootstrap/bootstrap.min.css',
        '/libs/bootstrap-icons/bootstrap-icons.min.css',
        '/html/math.css',
    ].forEach(url=>{
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = url;
        document.head.appendChild(link);    
    })

    const script1 = document.createElement('script');
    script1.id = 'MathJax-script';
    script1.src = '/libs/bootstrap/bootstrap.min.js';
    script1.async = true;
    document.head.appendChild(script1);
})();