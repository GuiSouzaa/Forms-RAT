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
    
    // Variável para controlar se o usuário está desenhando ou não
    let desenhando = false;

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

    // Retorna o canvas e seu contexto (para serem usados fora da função Assinatura)
    return { canvas, ctx };
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

        // Ajusta as opções do html2pdf para usar o conteúdo da página
        const options = {
            margin: [10, 10, 10, 10],
            filename: "RAT.pdf",
            html2canvas: { 
                scale: 2, // Aumenta a qualidade da renderização
                logging: true, // Habilita log para debug
                letterRendering: true,
                willReadFrequently: true // Habilita a leitura frequente para melhorar o desempenho
            },
            jsPDF: { 
                unit: "mm", 
                format: "a4", 
                orientation: "portrait",
                autoPaging: true // Permite que o conteúdo que ultrapassar a página seja automaticamente distribuído
            }
        };

        // Gera o PDF com as configurações definidas
        html2pdf().from(conteudo).set(options).save();
    });

    // Assinatura e limpeza
    const { canvas, ctx } = Assinatura();
    limpar(canvas, ctx);
});


