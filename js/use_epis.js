// Funções para o monitoramento de EPIs - Supervisor
const EPIActions = {
    viewAlerts: function() {
        alert('Abrindo painel completo de alertas...');
    },

    filterByArea: function(area) {
        console.log(`Filtrando por área: ${area}`);
        this.showNotification(`Filtro aplicado: ${this.getAreaName(area)}`);
    },

    filterByShift: function(shift) {
        console.log(`Filtrando por turno: ${shift}`);
        this.showNotification(`Filtro aplicado: Turno ${this.getShiftName(shift)}`);
    },

    exportData: function() {
        const timestamp = new Date().toLocaleString('pt-BR');
        alert(`Exportando relatório de EPIs - ${timestamp}`);
    },

    refreshData: function() {
        this.showNotification('🔄 Atualizando dados...');
        setTimeout(() => {
            this.showNotification('✅ Dados atualizados com sucesso!');
        }, 1500);
    },

    // A função agora recebe o objeto de evento para encontrar o botão clicado
    switchTab: function(tabName, event) {
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        // Usa event.currentTarget se o evento for passado
        if (event && event.currentTarget) {
            event.currentTarget.classList.add('active');
        } else {
             // Fallback para quando o event não for passado (ex: inicialização)
             document.querySelector(`.monitoring-tabs .tab-button[onclick*='${tabName}']`).classList.add('active');
        }
        
        const tabContent = document.getElementById(`${tabName}-tab`);
        if (tabContent) {
            tabContent.classList.add('active');
        }
    },

    // A função agora recebe o objeto de evento
    changeView: function(viewType, event) {
        document.querySelectorAll('.view-option').forEach(btn => {
            btn.classList.remove('active');
        });
        
        if (event && event.currentTarget) {
             event.currentTarget.classList.add('active');
        } else {
             document.querySelector(`.view-options .view-option[onclick*='${viewType}']`).classList.add('active');
        }
        
        if (viewType === 'chart') {
            this.showNotification('📊 Alternando para visualização de gráficos...');
        } else {
            this.showNotification('🎴 Alternando para visualização em cards...');
        }
    },

    viewEmployeeDetails: function(employeeId) {
        alert(`Abrindo detalhes do funcionário ID: ${employeeId}`);
    },

    notifyEmployee: function(employeeId) {
        if (confirm('Enviar notificação para o funcionário sobre o uso incorreto de EPI?')) {
            this.showNotification(`📢 Notificação enviada para funcionário ${employeeId}`);
        }
    },

    blockAccess: function(employeeId) {
        if (confirm('ATENÇÃO: Isso irá bloquear o acesso do funcionário à área restrita. Continuar?')) {
            this.showNotification(`🚫 Acesso bloqueado para funcionário ${employeeId}`, 'danger');
        }
    },

    // A função agora recebe o objeto de evento (ou o elemento que a chamou)
    resolveAlert: function(alertId, event) {
        if (confirm('Marcar este alerta como resolvido?')) {
            this.showNotification(`✅ Alerta ${alertId} marcado como resolvido`);
            const alertItem = event.currentTarget.closest('.alert-item');
            if (alertItem) {
                alertItem.classList.add('resolved'); 
                alertItem.style.opacity = '0.5';
                
                alertItem.querySelectorAll('.alert-actions button').forEach(btn => {
                    btn.disabled = true;
                });
            }
        }
    },

    // Limpa todos os alertas marcados como resolvidos
    clearAlerts: function() {
        const resolvedAlerts = document.querySelectorAll('.alerts-list .alert-item.resolved');
        
        if (resolvedAlerts.length > 0) {
            if (confirm(`Deseja limpar ${resolvedAlerts.length} alertas marcados como resolvidos?`)) {
                resolvedAlerts.forEach(alertItem => {
                    alertItem.remove();
                });
                this.showNotification('🗑️ Alertas resolvidos removidos', 'info');
            }
        } else {
             this.showNotification('Nenhum alerta resolvido para limpar.', 'info');
        }
    },

    getAreaName: function(areaCode) {
        const areas = {
            'all': 'Todas as Áreas',
            'production': 'Produção',
            'maintenance': 'Manutenção',
            'laboratory': 'Laboratório'
        };
        return areas[areaCode] || areaCode;
    },

    getShiftName: function(shiftCode) {
        const shifts = {
            'all': 'Todos os Turnos',
            'morning': 'Manhã',
            'afternoon': 'Tarde',
            'night': 'Noite'
        };
        return shifts[shiftCode] || shiftCode;
    },

    showNotification: function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'danger' ? '#dc3545' : '#166cc7'};
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
};

// ===============================================
// INICIALIZAÇÃO DA PÁGINA
// ===============================================

// Adicionar estilos CSS para animações
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .notification {
        font-family: inherit;
        font-size: 0.9rem;
        font-weight: 500;
    }
    
    .alerts-list .alert-item.resolved {
        background-color: #f1f7ff;
        border-left: 4px solid #17a2b8;
        transition: all 0.5s ease;
    }
`;
document.head.appendChild(style);


document.addEventListener('DOMContentLoaded', function() {
    let timeElement = document.getElementById('current-time');
    if (!timeElement) {
        timeElement = document.createElement('span');
        timeElement.id = 'current-time';
        const footerContent = document.querySelector('.main-footer .footer-content p');
        if(footerContent) {
            footerContent.appendChild(document.createElement('br'));
            footerContent.appendChild(timeElement);
        }
    }

    function updateTime() {
        const now = new Date();
        timeElement.textContent = now.toLocaleString('pt-BR');
    }
    
    updateTime();
    setInterval(updateTime, 60000);

    // Simular dados em tempo real (para demonstração)
    setInterval(() => {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const currentText = stat.textContent.replace('%', '');
            const current = parseFloat(currentText);

            if (!isNaN(current)) {
                // Ajusta a mudança com base na porcentagem ou valor absoluto
                const change = stat.textContent.includes('%') ? 
                                (Math.random() * 0.5 * (Math.random() > 0.5 ? 1 : -1)) : 
                                (Math.random() > 0.5 ? 1 : -1);

                let newValue = current + change;

                // Limita valores percentuais entre 80 e 99.9
                if (stat.textContent.includes('%')) {
                    newValue = Math.max(80.0, Math.min(99.9, newValue));
                    stat.textContent = `${newValue.toFixed(1)}%`;
                } else {
                    // Limita valores absolutos (ex: 42 Verificações)
                    newValue = Math.max(1, Math.min(200, newValue));
                    stat.textContent = Math.round(newValue);
                }
            }
        });
    }, 10000);


    // 4. Correção nas Chamadas HTML para passar o 'event'
    
    // Seleciona todos os botões de abas e adiciona o 'event'
    document.querySelectorAll('.monitoring-tabs .tab-button').forEach(button => {
        const tabName = button.getAttribute('onclick').match(/'([^']+)'/)[1];
        button.setAttribute('onclick', `EPIActions.switchTab('${tabName}', event)`);
    });

    // Seleciona todos os botões de visualização e adiciona o 'event'
    document.querySelectorAll('.view-options .view-option').forEach(button => {
        const viewType = button.getAttribute('onclick').match(/'([^']+)'/)[1];
        button.setAttribute('onclick', `EPIActions.changeView('${viewType}', event)`);
    });

    // Seleciona todos os botões de resolver alerta e adiciona o 'event'
    document.querySelectorAll('.alerts-list button[onclick*="resolveAlert"]').forEach(button => {
        const alertId = button.getAttribute('onclick').match(/\((\d+)\)/)[1];
        button.setAttribute('onclick', `EPIActions.resolveAlert(${alertId}, event)`);
    });
    
    // Inicializa as abas de monitoramento
    EPIActions.switchTab('employees', { currentTarget: document.querySelector('.monitoring-tabs .tab-button.active') });
});