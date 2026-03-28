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
    const currentTheme = localStorage.getItem('theme');

    // Revisar si ya existía una preferencia guardada
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            let theme = 'light';
            if (document.body.classList.contains('dark-theme')) {
                theme = 'dark';
            }
            localStorage.setItem('theme', theme); // Guardar preferencia
        });
    }
});