let pontuacao = 0;
let perguntaAtual = 0;
let tempoRestante = 30;
let timerInterval;
let confettiAtivo = false;

const perguntas = [
    {
        pergunta: "O que é Inteligência Artificial?",
        alternativas: [
            "Tecnologia que permite às máquinas simularem a inteligência humana",
            "Sistema de computadores que só executa tarefas pré-programadas",
            "Tipo de robô que substitui completamente os humanos",
            "Software de edição de fotos avançado"
        ],
        correta: 0,
        explicacao: "IA envolve máquinas que aprendem e pensam como humanos!"
    },
    {
        pergunta: "Qual destes é um exemplo de IA no dia a dia?",
        alternativas: [
            "Assistentes virtuais como Siri e Alexa",
            "Calculadora comum",
            "Editor de texto básico",
            "Relógio analógico"
        ],
        correta: 0,
        explicacao: "Assistentes virtuais usam IA para entender e responder comandos!"
    },
    {
        pergunta: "O que é Machine Learning?",
        alternativas: [
            "Subárea da IA onde máquinas aprendem com dados",
            "Processo de montagem de computadores",
            "Técnica de programação manual",
            "Sistema de armazenamento em nuvem"
        ],
        correta: 0,
        explicacao: "Machine Learning é aprender padrões a partir de dados!"
    },
    {
        pergunta: "Quais são os principais tipos de aprendizagem de máquina?",
        alternativas: [
            "Supervisionado, não supervisionado e por reforço",
            "Digital, analógico e híbrido",
            "Manual, automático e semi-automático",
            "Básico, intermediário e avançado"
        ],
        correta: 0,
        explicacao: "Cada tipo tem uma abordagem diferente para o aprendizado!"
    },
    {
        pergunta: "Qual é um desafio ético da IA?",
        alternativas: [
            "Viés algorítmico e privacidade de dados",
            "Velocidade de processamento lenta",
            "Custo de implementação baixo",
            "Facilidade de programação"
        ],
        correta: 0,
        explicacao: "A IA deve ser desenvolvida com responsabilidade ética!"
    }
];

function iniciarQuiz() {
    pontuacao = 0;
    perguntaAtual = 0;
    document.querySelector('.btn-iniciar').style.display = 'none';
    document.querySelector('.caixa-resultado').style.display = 'none';
    atualizarProgresso();
    iniciarTemporizador();
    mostrarPergunta();
}

function atualizarProgresso() {
    const progresso = (perguntaAtual / perguntas.length) * 100;
    document.querySelector('.progress-fill').style.width = progresso + '%';
    document.querySelector('.pergunta-numero').textContent = `Pergunta ${perguntaAtual + 1}/${perguntas.length}`;
}

function iniciarTemporizador() {
    clearInterval(timerInterval);
    tempoRestante = 30;
    atualizarTemporizador();
    
    timerInterval = setInterval(() => {
        tempoRestante--;
        atualizarTemporizador();
        
        if (tempoRestante <= 0) {
            clearInterval(timerInterval);
            avancarPergunta();
        }
    }, 1000);
}

function atualizarTemporizador() {
    const timerElement = document.querySelector('.timer span');
    timerElement.textContent = tempoRestante + 's';
    
    if (tempoRestante <= 10) {
        timerElement.style.color = '#ff6b6b';
        timerElement.classList.add('pulse');
    } else {
        timerElement.style.color = '#666';
        timerElement.classList.remove('pulse');
    }
}

function mostrarPergunta() {
    if (perguntaAtual >= perguntas.length) {
        clearInterval(timerInterval);
        mostrarResultado();
        return;
    }

    const pergunta = perguntas[perguntaAtual];
    document.querySelector('.pergunta-texto').textContent = pergunta.pergunta;
    document.querySelector('.pergunta-texto').classList.add('slide-in');
    
    const caixaAlternativas = document.querySelector('.caixa-alternativas');
    caixaAlternativas.innerHTML = '';
    
    pergunta.alternativas.forEach((alternativa, index) => {
        const botao = document.createElement('button');
        botao.textContent = alternativa;
        botao.className = 'alternativa slide-in';
        botao.style.animationDelay = (index * 0.1) + 's';
        botao.onclick = () => verificarResposta(index);
        caixaAlternativas.appendChild(botao);
    });

    atualizarProgresso();
    iniciarTemporizador();
}

function verificarResposta(indice) {
    clearInterval(timerInterval);
    
    const pergunta = perguntas[perguntaAtual];
    const botoes = document.querySelectorAll('.alternativa');
    
    botoes.forEach((botao, i) => {
        botao.disabled = true;
        if (i === pergunta.correta) {
            botao.classList.add('correta');
        } else if (i === indice && i !== pergunta.correta) {
            botao.classList.add('incorreta');
        }
    });

    if (indice === pergunta.correta) {
        pontuacao++;
        criarConfetti();
    }

    setTimeout(() => {
        perguntaAtual++;
        mostrarPergunta();
    }, 2000);
}

function avancarPergunta() {
    const botoes = document.querySelectorAll('.alternativa');
    botoes.forEach(botao => botao.disabled = true);
    
    setTimeout(() => {
        perguntaAtual++;
        mostrarPergunta();
    }, 1000);
}

function mostrarResultado() {
    document.querySelector('.pergunta-texto').textContent = 'Quiz Concluído!';
    document.querySelector('.pergunta-texto').classList.add('slide-in');
    
    const caixaAlternativas = document.querySelector('.caixa-alternativas');
    caixaAlternativas.innerHTML = '';
    
    const textoResultado = document.querySelector('.texto-resultado');
    const porcentagem = Math.round((pontuacao / perguntas.length) * 100);
    
    let mensagem;
    if (porcentagem >= 80) {
        mensagem = '🎯 Excelente! Você domina o assunto!';
    } else if (porcentagem >= 60) {
        mensagem = '👏 Muito bom! Quase lá!';
    } else if (porcentagem >= 40) {
        mensagem = '👍 Bom trabalho! Continue aprendendo!';
    } else {
        mensagem = '💡 Continue estudando! Você vai melhorar!';
    }
    
    textoResultado.textContent = `${mensagem} Você acertou ${pontuacao} de ${perguntas.length} perguntas (${porcentagem}%)`;
    
    // Atualizar estatísticas
    document.querySelectorAll('.stat-value')[0].textContent = pontuacao;
    document.querySelectorAll('.stat-value')[1].textContent = porcentagem + '%';
    document.querySelectorAll('.stat-value')[2].textContent = pontuacao * 100;
    
    const botaoReiniciar = document.createElement('button');
    botaoReiniciar.textContent = '🔄 Fazer Novamente';
    botaoReiniciar.className = 'btn-reiniciar slide-in';
    botaoReiniciar.onclick = iniciarQuiz;
    caixaAlternativas.appendChild(botaoReiniciar);
    
    document.querySelector('.caixa-resultado').style.display = 'block';
    
    if (porcentagem >= 80) {
        criarConfetti();
    }
}

function criarConfetti() {
    if (confettiAtivo) return;
    confettiAtivo = true;
    
    const confettiContainer = document.querySelector('.confetti-container');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#667eea', '#764ba2'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confettiContainer.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
    
    setTimeout(() => {
        confettiAtivo = false;
    }, 3000);
}

// Adicionar estilo para confetti
const style = document.createElement('style');
style.textContent = `
.confetti {
    position: absolute;
    top: -10px;
    animation: fall linear forwards;
}

@keyframes fall {
    to {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
    }
}
`;
document.head.appendChild(style);

// Efeitos iniciais
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.caixa-principal').classList.add('slide-in');
});