
// MENU MOBILE
const menuButton = document.getElementById('menu-button');
const menu = document.getElementById('menu');

if (menuButton && menu) {
    menuButton.addEventListener('click', () => {
        menuButton.classList.toggle('active');
        menu.classList.toggle('active');
    });

    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuButton.classList.remove('active');
            menu.classList.remove('active');
        });
    });
}


// CARROSSEL DE DEPOIMENTOS
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

        frasesTrack.style.transform = `translateX(-${fraseAtual * 100}%)`;

        fraseDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === fraseAtual);
        });
    }

    // CLICA NOS PONTOS
    fraseDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            mostrarFrase(index);
        });
    });

    // ARRASTAR COM MOUSE E DESLIZAR COM O DEDO
    let inicioX = 0;
    let inicioY = 0;
    let arrastando = false;
    let ponteiroId = null;

    frasesTrack.addEventListener('pointerdown', (event) => {

        if (event.pointerType === 'mouse' && event.button !== 0) {
            return;
        }

        inicioX = event.clientX;
        inicioY = event.clientY;

        arrastando = true;
        ponteiroId = event.pointerId;

        frasesTrack.setPointerCapture(event.pointerId);
    });

    frasesTrack.addEventListener('pointerup', (event) => {

        if (!arrastando || event.pointerId !== ponteiroId) {
            return;
        }

        const distanciaX = event.clientX - inicioX;
        const distanciaY = event.clientY - inicioY;

        // Só troca o depoimento se o movimento for principalmente horizontal
        if (Math.abs(distanciaX) > 40 && Math.abs(distanciaX) > Math.abs(distanciaY)) {

            if (distanciaX < 0) {
                mostrarFrase(fraseAtual + 1);
            } else {
                mostrarFrase(fraseAtual - 1);
            }
        }

        arrastando = false;
        ponteiroId = null;
    });

    // CANCELA O ARRASTE
    function cancelarArraste() {
        arrastando = false;
        ponteiroId = null;
    }

    frasesTrack.addEventListener('pointercancel', cancelarArraste);
    frasesTrack.addEventListener('lostpointercapture', cancelarArraste);

    // INICIA NO PRIMEIRO DEPOIMENTO
    mostrarFrase(0);
}


// FAQ
const perguntasFaq = document.querySelectorAll('.faq-pergunta');

perguntasFaq.forEach(pergunta => {
    pergunta.addEventListener('click', () => {
        const item = pergunta.parentElement;
        item.classList.toggle('active');
    });
});


// BOTÃO VOLTAR AO TOPO
const botaoTopo = document.getElementById('voltar-topo');

if (botaoTopo) {
    botaoTopo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// ANO AUTOMÁTICO NO RODAPÉ
const anoAtual = document.getElementById('ano');

if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
}


// RESTAURAÇÃO DO SCROLL
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}


// REMOVE HASH DA URL
if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
}


// INICIA NO TOPO
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});


// HEADER AO SUBIR
const header = document.querySelector('header');

if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('rolagem');
        } else {
            header.classList.remove('rolagem');
        }
    });
}
