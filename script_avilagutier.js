document.addEventListener('DOMContentLoaded', () => {
    // --- 1. EFECTO TYPEWRITER (ESCRITURA) ---
    const researcherElement = document.querySelector('.researcher');
    if (researcherElement) {
        const text = researcherElement.textContent;
        researcherElement.textContent = ''; // Limpiamos el texto original
        let index = 0;

        function typeEffect() {
            if (index < text.length) {
                researcherElement.textContent += text.charAt(index);
                index++;
                setTimeout(typeEffect, 80); // Velocidad de escritura
            }
        }
        typeEffect();
    }

    // --- 2. APARICIÓN SUAVE (SCROLL REVEAL) ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Seleccionamos los contenedores principales para animarlos
    document.querySelectorAll('.cover-left, .cover-right, .project-card, .pub-item').forEach(el => {
        el.classList.add('reveal'); // Añadimos clase base
        observer.observe(el);
    });

    // --- 3. MODO OSCURO (DARK MODE) ---
    const darkModeBtn = document.getElementById('dark-mode-toggle');

    function getIsDark() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme === 'dark';
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    function updateDarkModeUI(isDark) {
        if (isDark) {
            document.documentElement.classList.add('dark-theme');
            document.body.classList.add('dark-theme');
        } else {
            document.documentElement.classList.remove('dark-theme');
            document.body.classList.remove('dark-theme');
        }

        if (darkModeBtn) {
            darkModeBtn.textContent = isDark ? '☀️' : '🌙';
            darkModeBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        }
    }

    // Sincronizar estado inicial
    updateDarkModeUI(getIsDark());

    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', () => {
            const currentIsDark = document.documentElement.classList.contains('dark-theme');
            const newIsDark = !currentIsDark;
            localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
            updateDarkModeUI(newIsDark);
        });
    }

    // Escuchar cambios de preferencia del sistema si el usuario no ha fijado una manualmente
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            updateDarkModeUI(e.matches);
        }
    });
});
