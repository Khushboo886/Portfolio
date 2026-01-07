(function(){
    const toggle = document.getElementById('theme-toggle');
    const root = document.documentElement;
    const key = 'theme';

    function applyTheme(theme){
        if(theme === 'dark'){
            root.classList.add('dark-theme');
            if(toggle) toggle.textContent = '☀️';
        } else {
            root.classList.remove('dark-theme');
            if(toggle) toggle.textContent = '🌙';
        }
    }

    // initialise from localStorage or prefers-color-scheme
    const saved = localStorage.getItem(key) || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(saved);

    if(toggle){
        toggle.addEventListener('click', function(){
            const isDark = root.classList.contains('dark-theme');
            const next = isDark ? 'light' : 'dark';
            applyTheme(next);
            localStorage.setItem(key, next);
        });
    }
})();
