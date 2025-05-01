// Espera o conteúdo HTML ser totalmente carregado antes de executar o código
document.addEventListener("DOMContentLoaded", function() {
    // Chama a função Assinatura() e desestrutura o objeto retornado para pegar o canvas e seu contexto
    const { canvas, ctx } = Assinatura();

    // Chama a função limpar para associar o evento de limpar o canvas ao botão
    limpar(canvas, ctx);
});

// Função para configurar o canvas para desenhar a assinatura
function Assinatura() {
    // Pega o elemento <canvas> pelo seu id "Assinatura"
    const canvas = document.getElementById('Assinatura');
    // Obtém o contexto 2D do canvas, que é utilizado para desenhar
    const ctx = canvas.getContext('2d');

      // === INÍCIO: Tornar o canvas responsivo ===
      function resizeCanvas() {
        const width = canvas.offsetWidth; // largura CSS
        canvas.width = width;             // largura real para desenho
        canvas.height = 100;              // altura fixa ou você pode usar: canvas.offsetHeight
    }

    // Redimensiona quando a janela é redimensionada
    window.addEventListener('resize',resizeCanvas);
    // Redimensiona no primeiro load
    resizeCanvas();
    
    // Variável para controlar se o usuário está desenhando ou não
    let desenhando = false;

    // Evento do mouse

    // Adiciona o evento 'mousedown' que dispara quando o usuário clica no canvas
    canvas.addEventListener('mousedown', (e) => {
        // Quando o mouse é pressionado, o desenho começa
        desenhando = true;
        // Começa um novo caminho para desenhar
        ctx.beginPath();
        // Move o "pincel" do desenho para a posição onde o mouse foi clicado
        ctx.moveTo(e.offsetX, e.offsetY);
    });

    // Adiciona o evento 'mousemove' que dispara quando o mouse se move no canvas
    canvas.addEventListener('mousemove', (e) => {
        // Se o usuário estiver desenhando (ou seja, se desenhando == true)
        if (desenhando) {
            // Desenha uma linha até a posição atual do mouse
            ctx.lineTo(e.offsetX, e.offsetY);
            // Aplica o desenho da linha no canvas (torna visível)
            ctx.stroke();
        }
    });

    // Adiciona o evento 'mouseup' que dispara quando o botão do mouse é solto
    canvas.addEventListener('mouseup', () => {
        // Para o desenho ao soltar o botão do mouse
        desenhando = false;
    });

    // Adiciona o evento 'mouseleave' que dispara quando o mouse sai do canvas
    canvas.addEventListener('mouseleave', () => {
        // Para o desenho caso o mouse saia da área do canvas
        desenhando = false;
    });

    // Eventos touch (mobile)
    canvas.addEventListener('touchstart', e => {
        e.preventDefault();
        desenhando = true;
        const pos = getTouchPos(canvas, e);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    });

    canvas.addEventListener('touchmove', e => {
        if (desenhando) {
            const pos = getTouchPos(canvas, e);
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
        }
    });

    canvas.addEventListener('touchend', () => desenhando = false);
        
    // Retorna o canvas e seu contexto (para serem usados fora da função Assinatura)
    return { canvas, ctx };
}


// Pega posição do toque
function getTouchPos(canvas, e) {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
    };
}

// Função para limpar o conteúdo desenhado no canvas
function limpar(canvas, ctx) {
    // Associa o evento de clique no botão "Limpar"
    document.getElementById('Limpar').addEventListener('click', () => {
        // Limpa o conteúdo do canvas, apagando tudo o que foi desenhado
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
}


// Baixar PDF
// Espera o conteúdo HTML ser totalmente carregado antes de executar o código
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('Gerar-PDF').addEventListener("click", function() {
        const conteudo = document.getElementById('conteudo-pdf');

        const options = {
            margin: [10, 10, 10, 10],
            filename: "RAT.pdf",
            html2canvas: { 
                scale: 2,
                scrollY: 0, // Capturar o conteúdo inteiro
                logging: true,
                letterRendering: true,
                willReadFrequently: true
            },
            jsPDF: { 
                unit: "mm", 
                format: "a4", 
                orientation: "portrait"
            },
            pagebreak: { mode: ['css', 'legacy'] } // conteúdo ultrapassar páginas
        };

        html2pdf().from(conteudo).set(options).save();
    });

    // Assinatura e limpeza
    const { canvas, ctx } = Assinatura();
    limpar(canvas, ctx);
});


const canvas = document.querySelector("canvas"); // seu canvas de assinatura
const assinaturaImg = document.createElement("img");
assinaturaImg.src = canvas.toDataURL(); // Converte o canvas em imagem
assinaturaImg.style.width = canvas.style.width;
assinaturaImg.style.height = canvas.style.height;

// Substitui o canvas pela imagem temporariamente
canvas.parentNode.replaceChild(assinaturaImg, canvas);


// Gera o PDF
html2pdf().from(conteudo).set(options).save().then(() => {
    // Depois que salvar o PDF, traz o canvas de volta
    assinaturaImg.parentNode.replaceChild(canvas, assinaturaImg);
});


