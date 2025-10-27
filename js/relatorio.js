// relatorio.js

// ===== DADOS DOS RELATÓRIOS =====
// Objeto que contém todas as informações específicas para cada tipo de relatório
const reportData = {
    epi: {
        title: "Conformidade com EPI",
        description: "Relatório detalhado sobre o uso de Equipamentos de Proteção Individual",
        metrics: {
            "Conformidade Geral": "92%",
            "Funcionários Regulares": "46",
            "Funcionários Irregulares": "4",
            "EPI Mais Utilizado": "Capacete de Segurança",
            "EPI Menos Utilizado": "Protetor Auditivo"
        },
        placeholder: "Digite observações sobre conformidade de EPIs, equipamentos com problemas, sugestões de melhorias..."
    },
    excecoes: {
        title: "Relatório de Exceções",
        description: "Casos de não conformidade e equipamentos com problemas",
        metrics: {
            "Total de Exceções": "5",
            "Exceções Críticas": "2",
            "Exceções Resolvidas": "3",
            "Equipamentos com Falhas": "Capacete, Luvas",
            "Tempo Médio de Resolução": "2 dias"
        },
        placeholder: "Registre detalhes das exceções, ações tomadas, equipamentos problemáticos e medidas corretivas..."
    },
    atividade: {
        title: "Atividade do Usuário",
        description: "Monitoramento de acesso e atividades dos funcionários",
        metrics: {
            "Usuários Ativos Hoje": "18",
            "Acessos no Mês": "245",
            "Horário de Pico": "14:00 - 16:00",
            "Usuários com Acesso Expirado": "2",
            "Tentativas de Acesso Bloqueadas": "1"
        },
        placeholder: "Anote observações sobre padrões de acesso, usuários com problemas, horários críticos..."
    },
    incidentes: {
        title: "Relatório de Incidentes",
        description: "Registro e acompanhamento de incidentes de segurança",
        metrics: {
            "Incidentes Registrados": "3",
            "Incidentes Graves": "1",
            "Incidentes Resolvidos": "2",
            "Tempo Médio de Resposta": "45 min",
            "Área com Mais Incidentes": "Setor de Produção"
        },
        placeholder: "Descreva detalhes dos incidentes, causas identificadas, ações emergenciais e prevenções futuras..."
    }
};

// ===== ESTADO DAS ANOTAÇÕES =====
// Objeto para armazenar as anotações salvas pelo usuário
let savedNotes = {
    epi: "",          // Anotações sobre EPI
    excecoes: "",     // Anotações sobre exceções
    atividade: "",    // Anotações sobre atividade
    incidentes: ""    // Anotações sobre incidentes
};

// ===== INICIALIZAÇÃO =====
// Quando a página terminar de carregar, executa estas funções
document.addEventListener('DOMContentLoaded', function() {
    initializeModalSystem();  // Configura o sistema de modais
    initializeChart();        // Inicializa o gráfico
    loadSavedNotes();         // Carrega anotações salvas anteriormente
});

// ===== SISTEMA DE MODAL =====
// Configura toda a interação com os modais (popups)
function initializeModalSystem() {
    // Seleciona elementos do DOM
    const modal = document.getElementById('popupModal');
    const closeBtn = document.getElementById('closeModal');
    const saveBtn = document.getElementById('saveNote');
    
    // ===== CONFIGURAÇÃO DOS CARDS CLICÁVEIS =====
    // Para cada card de relatório na página...
    document.querySelectorAll('.report-card').forEach(card => {
        // Adiciona evento de clique - quando usuário clicar no card
        card.addEventListener('click', function(e) {
            // Pega o tipo de relatório do atributo data-type
            const reportType = this.getAttribute('data-type');
            // Abre o modal correspondente
            openModal(reportType);
        });
        
        // ===== SUPORTE AO TECLADO =====
        // Permite abrir modal com Enter ou Espaço (acessibilidade)
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault(); // Evita comportamento padrão
                const reportType = this.getAttribute('data-type');
                openModal(reportType);
            }
        });
    });

    // ===== BOTÃO FECHAR MODAL =====
    // Quando clicar no X, fecha o modal
    closeBtn.addEventListener('click', closeModal);

    // ===== FECHAR MODAL CLICANDO FORA =====
    // Se o usuário clicar na área escura ao redor do modal, fecha
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // ===== FECHAR MODAL COM TECLA ESC =====
    // Permite fechar modal pressionando ESC (melhor experiência usuário)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });

    // ===== BOTÃO SALVAR ANOTAÇÃO =====
    // Quando clicar em "Salvar Anotação"
    saveBtn.addEventListener('click', saveNote);
}

// ===== ABRIR MODAL =====
// Função para abrir o modal com os dados específicos do relatório
function openModal(reportType) {
    // Seleciona elementos do DOM dentro do modal
    const modal = document.getElementById('popupModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalMetrics = document.getElementById('modalMetrics');
    const modalTextarea = document.getElementById('modalTextarea');
    
    // Pega os dados do relatório baseado no tipo (epi, excecoes, etc)
    const data = reportData[reportType];

    // Se não encontrar dados, sai da função
    if (!data) return;

    // ===== ATUALIZAR CONTEÚDO DO MODAL =====
    
    // 1. Atualiza título e descrição
    modalTitle.textContent = data.title;
    modalDescription.textContent = data.description;

    // 2. Limpa métricas anteriores (se houver)
    modalMetrics.innerHTML = '';

    // 3. Adiciona cada métrica ao modal
    for (const [key, value] of Object.entries(data.metrics)) {
        const metricItem = document.createElement('div');
        metricItem.className = 'metric-item';
        metricItem.innerHTML = `
            <span class="metric-label">${key}</span>
            <span class="metric-value">${value}</span>
        `;
        modalMetrics.appendChild(metricItem);
    }

    // 4. Configura a área de texto para anotações
    modalTextarea.placeholder = data.placeholder; // Texto de exemplo
    modalTextarea.value = savedNotes[reportType] || ''; // Carrega anotação salva ou deixa vazio

    // ===== MOSTRAR MODAL =====
    modal.style.display = 'flex'; // Torna o modal visível
    document.body.style.overflow = 'hidden'; // Impide rolagem da página

    // Foca automaticamente na área de texto (melhor UX)
    setTimeout(() => {
        modalTextarea.focus();
    }, 100);

    // Armazena qual relatório está aberto (para salvar depois)
    modal.setAttribute('data-current-report', reportType);
}

// ===== FECHAR MODAL =====
// Função para fechar o modal e restaurar a página
function closeModal() {
    const modal = document.getElementById('popupModal');
    modal.style.display = 'none'; // Esconde o modal
    document.body.style.overflow = 'auto'; // Permite rolagem da página novamente
    modal.removeAttribute('data-current-report'); // Limpa o relatório atual
}

// ===== SALVAR ANOTAÇÃO =====
// Função chamada quando usuário clica em "Salvar Anotação"
function saveNote() {
    const modal = document.getElementById('popupModal');
    const reportType = modal.getAttribute('data-current-report'); // Pega qual relatório está aberto
    const textarea = document.getElementById('modalTextarea'); // Pega o texto digitado
    
    // Verifica se temos um relatório válido e texto para salvar
    if (reportType && textarea) {
        // Salva a anotação no objeto savedNotes
        savedNotes[reportType] = textarea.value.trim();
        
        // ===== SALVAR NO LOCALSTORAGE =====
        // Converte o objeto para string e salva no navegador
        localStorage.setItem('confisafe_notes', JSON.stringify(savedNotes));
        
        // ===== FEEDBACK VISUAL =====
        // Mostra mensagem de sucesso para o usuário
        showNotification('Anotação salva com sucesso!', 'success');
        
        // Fecha o modal automaticamente após salvar (melhor UX)
        setTimeout(closeModal, 800);
    }
}

// ===== CARREGAR ANOTAÇÕES SALVAS =====
// Função para carregar anotações do localStorage quando a página abre
function loadSavedNotes() {
    // Tenta pegar as anotações salvas no navegador
    const saved = localStorage.getItem('confisafe_notes');
    if (saved) {
        try {
            // Converte de volta de string para objeto
            savedNotes = JSON.parse(saved);
        } catch (e) {
            // Se der erro (dados corrompidos), reseta as anotações
            console.error('Erro ao carregar anotações:', e);
            savedNotes = { epi: "", excecoes: "", atividade: "", incidentes: "" };
        }
    }
}

// ===== MOSTRAR NOTIFICAÇÃO =====
// Função para mostrar mensagens temporárias para o usuário
function showNotification(message, type = 'success') {
    // Remove notificação anterior se existir
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Cria nova notificação
    const notification = document.createElement('div');
    notification.className = `notification ${type === 'error' ? 'notification-error' : ''}`;
    notification.textContent = message;
    notification.setAttribute('role', 'alert'); // Acessibilidade
    notification.setAttribute('aria-live', 'polite'); // Acessibilidade

    // Adiciona a notificação na página
    document.body.appendChild(notification);

    // ===== REMOVER NOTIFICAÇÃO AUTOMATICAMENTE =====
    // Depois de 3 segundos, inicia animação de saída
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        // Depois da animação, remove completamente
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// ===== INICIALIZAR GRÁFICO =====
// Função para criar o gráfico na página
function initializeChart() {
    // Pega o elemento canvas onde o gráfico será desenhado
    const ctx = document.getElementById('relatorioGrafico');
    if (!ctx) return; // Se não encontrar, sai da função

    try {
        // Cria um novo gráfico usando Chart.js
        new Chart(ctx.getContext('2d'), {
            type: 'line', // Tipo de gráfico: linha
            data: {
                // Dias da semana no eixo X
                labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
                datasets: [{
                    label: 'Acessos ao Sistema', // Legenda
                    data: [65, 59, 80, 81, 56, 55, 40], // Valores no eixo Y
                    borderColor: '#166cc7', // Cor da linha
                    backgroundColor: 'rgba(22, 108, 199, 0.1)', // Cor de fundo
                    borderWidth: 2, // Espessura da linha
                    tension: 0.4, // Suavização da curva
                    fill: true // Preenche área abaixo da linha
                }]
            },
            options: {
                responsive: true, // Gráfico responsivo
                plugins: {
                    legend: {
                        position: 'top', // Legenda no topo
                    },
                    tooltip: {
                        mode: 'index', // Mostra tooltips
                        intersect: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true, // Eixo Y começa em 0
                        grid: {
                            color: 'rgba(0,0,0,0.1)' // Cor das grades
                        }
                    },
                    x: {
                        grid: {
                            display: false // Remove grades do eixo X
                        }
                    }
                }
            }
        });
    } catch (error) {
        // Se der erro ao criar gráfico, mostra no console
        console.error('Erro ao inicializar gráfico:', error);
    }
}

// ===== FUNÇÕES GLOBAIS (OPCIONAL) =====
// Disponibiliza funções no escopo global para debugging
// Pode ser útil para testar no console do navegador
window.openModal = openModal;
window.closeModal = closeModal;
window.saveNote = saveNote;