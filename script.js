const menuButton = document.getElementById('menu-button');
const menu = document.getElementById('menu');

if (menuButton && menu) {
    menuButton.addEventListener('click', (event) => {
        event.stopPropagation();

        menu.classList.toggle('active');
        menuButton.classList.toggle('active');
    });

    document.addEventListener('click', (event) => {
        if (
            menu.classList.contains('active') &&
            !menu.contains(event.target) &&
            !menuButton.contains(event.target)
        ) {
            menu.classList.remove('active');
            menuButton.classList.remove('active');
        }
    });

    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            menuButton.classList.remove('active');
        });
    });
}

const frasesTrack = document.querySelector('.frases-track');
const fraseSlides = document.querySelectorAll('.frase-slide');
const fraseDots = document.querySelectorAll('.frases-dots .frase-dot');

let fraseAtual = 0;

if (frasesTrack && fraseSlides.length && fraseDots.length) {

    function mostrarFrase(index) {
        if (index < 0) {
            index = fraseSlides.length - 1;
        }

        if (index >= fraseSlides.length) {
            index = 0;
        }

        fraseAtual = index;

        frasesTrack.style.transform =
            `translateX(-${fraseAtual * 100}%)`;

        fraseDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === fraseAtual);
        });
    }

    fraseDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            mostrarFrase(index);
        });
    });

    let inicioToqueFrase = 0;

    frasesTrack.addEventListener('touchstart', (event) => {
        inicioToqueFrase = event.touches[0].clientX;
    }, { passive: true });

    frasesTrack.addEventListener('touchend', (event) => {
        const fimToqueFrase = event.changedTouches[0].clientX;
        const distancia = fimToqueFrase - inicioToqueFrase;

        if (Math.abs(distancia) > 50) {
            if (distancia < 0) {
                mostrarFrase(fraseAtual + 1);
            } else {
                mostrarFrase(fraseAtual - 1);
            }
        }
    });

    let inicioMouseFrase = 0;
    let arrastandoFrase = false;

    frasesTrack.addEventListener('mousedown', (event) => {
        inicioMouseFrase = event.clientX;
        arrastandoFrase = true;
    });

    frasesTrack.addEventListener('mouseup', (event) => {
        if (!arrastandoFrase) return;

        const fimMouseFrase = event.clientX;
        const distancia = fimMouseFrase - inicioMouseFrase;

        if (Math.abs(distancia) > 50) {
            if (distancia < 0) {
                mostrarFrase(fraseAtual + 1);
            } else {
                mostrarFrase(fraseAtual - 1);
            }
        }

        arrastandoFrase = false;
    });

    frasesTrack.addEventListener('mouseleave', () => {
        arrastandoFrase = false;
    });
}

const perguntasFaq = document.querySelectorAll('.faq-pergunta');

perguntasFaq.forEach(pergunta => {
    pergunta.addEventListener('click', () => {
        const item = pergunta.parentElement;
        item.classList.toggle('active');
    });
});

const botaoTopo = document.getElementById('voltar-topo');

if (botaoTopo) {
    window.addEventListener('scroll', () => {
        botaoTopo.classList.toggle('visivel', window.scrollY > 400);
    });

    botaoTopo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

const anoAtual = document.getElementById('ano-atual');

if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
}

// Impede o navegador de restaurar a posição anterior.
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Remove uma possível âncora da URL ao abrir a página.
if (window.location.hash) {
    history.replaceState(
        null,
        '',
        window.location.pathname + window.location.search
    );
}

// Leva a página ao topo após o carregamento.
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});
