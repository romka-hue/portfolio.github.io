// main.js: Handles dark mode and language switching
document.addEventListener('DOMContentLoaded', function() {
    
    // --- Theme (Dark/Light Mode) ---
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const currentTheme = savedTheme || systemTheme;

    // Apply theme on load (saved theme overrides system theme)
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        let theme = 'light';
        if (document.body.classList.contains('dark-mode')) {
            theme = 'dark';
        }
        localStorage.setItem('theme', theme);
    });

    // --- Language (EN/TR) ---
    const langButtons = document.querySelectorAll('[data-lang-switch]');
    const translatableElements = document.querySelectorAll('[data-lang-en], [data-lang-tr]');
    let currentLang = localStorage.getItem('language') || 'en'; // Default to English

    function setLanguage(lang) {
        translatableElements.forEach(el => {
            const text = el.getAttribute(`data-lang-${lang}`);
            if (text) {
                el.textContent = text;
            }
        });

        // Update active button style
        langButtons.forEach(btn => {
            if (btn.getAttribute('data-lang-switch') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Save preference
        localStorage.setItem('language', lang);
        currentLang = lang;
    }

    langButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const lang = e.target.getAttribute('data-lang-switch');
            if (lang) {
                setLanguage(lang);
            }
        });
    });

    // Apply saved language on load
    setLanguage(currentLang);

    // --- Hero Typing Effect ---
    const taglineElement = document.querySelector('.hero .tagline');
    if (taglineElement) {
        const originalText = taglineElement.textContent;
        taglineElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                taglineElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 800);
    }

    console.log("UI script for theme and language loaded.");
});
