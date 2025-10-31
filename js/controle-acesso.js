// ===== APP ACTIONS =====
const AppActions = {
    // ===== EXPORTAÇÃO DE DADOS =====
    exportAccessData: function() {
        console.log('Exportando dados de acesso...');
        this.showNotification('Preparando exportação de dados...', 'info');
        
        // Simula tempo de processamento
        setTimeout(() => {
            const data = this.getAccessDataForExport();
            this.downloadCSV(data, 'acessos_' + new Date().toISOString().split('T')[0] + '.csv');
            this.showNotification('Dados exportados com sucesso!', 'success');
        }, 1500);
    },

    // ===== ATUALIZAÇÃO DE LISTA =====
    refreshAccessList: function() {
        console.log('Atualizando lista de acessos...');
        this.showNotification('Atualizando dados...', 'info');
        
        // Simula carregamento
        const refreshBtn = document.querySelector('.btn-primary');
        const originalText = refreshBtn.textContent;
        refreshBtn.textContent = '🔄 Atualizando...';
        refreshBtn.disabled = true;
        
        setTimeout(() => {
            this.loadAccessData();
            refreshBtn.textContent = originalText;
            refreshBtn.disabled = false;
            this.showNotification('Dados atualizados com sucesso!', 'success');
        }, 2000);
    },

    // ===== VISUALIZAÇÃO DE DETALHES =====
    viewAccessDetails: function(accessId) {
        console.log('Visualizando detalhes do acesso:', accessId);
        
        const accessData = this.getAccessById(accessId);
        if (accessData) {
            this.showAccessModal(accessData);
        }
    },

    // ===== BLOQUEIO DE ACESSO =====
    blockAccess: function(userId) {
        const user = this.getUserById(userId);
        if (user && confirm(`Tem certeza que deseja bloquear o acesso de ${user.name}?`)) {
            console.log('Bloqueando acesso para usuário:', userId);
            this.showNotification(`Acesso bloqueado para ${user.name}`, 'warning');
            
            // Atualiza interface
            this.updateAccessStatus(userId, 'blocked');
        }
    },

    // ===== DESBLOQUEIO DE ACESSO =====
    unblockAccess: function(userId) {
        const user = this.getUserById(userId);
        if (user && confirm(`Liberar acesso para ${user.name}?`)) {
            console.log('Liberando acesso para usuário:', userId);
            this.showNotification(`Acesso liberado para ${user.name}`, 'success');
            
            // Atualiza interface
            this.updateAccessStatus(userId, 'active');
        }
    },

    // ===== RESOLUÇÃO DE ALERTAS =====
    resolveAlert: function(alertId) {
        console.log('Resolvendo alerta:', alertId);
        
        const alertElement = document.querySelector(`.alert-item:nth-child(${alertId})`);
        if (alertElement) {
            alertElement.style.opacity = '0';
            alertElement.style.transform = 'translateX(100px)';
            
            setTimeout(() => {
                alertElement.remove();
                this.updateAlertCount();
                this.showNotification('Alerta resolvido com sucesso!', 'success');
            }, 300);
        }
    },

    // ===== FILTROS E PESQUISAS =====
    filterByStatus: function(status) {
        console.log('Filtrando por status:', status);
        
        const rows = document.querySelectorAll('.access-table tbody tr');
        rows.forEach(row => {
            if (status === 'all') {
                row.style.display = '';
            } else {
                const rowStatus = row.classList.contains('access-denied') ? 'denied' : 'allowed';
                row.style.display = rowStatus === status ? '' : 'none';
            }
        });
        
        this.showNotification(`Filtro aplicado: ${status}`, 'info');
    },

    searchAccess: function(searchTerm) {
        console.log('Pesquisando:', searchTerm);
        
        const rows = document.querySelectorAll('.access-table tbody tr');
        let results = 0;
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            const shouldShow = text.includes(searchTerm.toLowerCase());
            row.style.display = shouldShow ? '' : 'none';
            if (shouldShow) results++;
        });
        
        this.showNotification(`${results} resultados encontrados`, 'info');
    }
};

// ===== DATA MANAGEMENT =====
const DataManager = {
    // Dados de exemplo
    accessData: [
        {
            id: 1,
            userId: 1,
            userName: "João Silva",
            userRole: "Operador de Máquinas",
            userAvatar: "../assets/img/user1.png",
            area: "Setor de Produção",
            timestamp: "2024-10-28T14:32:00",
            type: "entry",
            status: "success",
            details: "Acesso regular durante turno da tarde"
        },
        {
            id: 2,
            userId: 2,
            userName: "Maria Santos",
            userRole: "Técnica de Laboratório",
            userAvatar: "../assets/img/user2.png",
            area: "Laboratório Químico",
            timestamp: "2024-10-28T14:25:00",
            type: "entry",
            status: "success",
            details: "Coleta de amostras para análise"
        },
        {
            id: 3,
            userId: 3,
            userName: "Carlos Oliveira",
            userRole: "Auxiliar de Manutenção",
            userAvatar: "../assets/img/user3.png",
            area: "Sala de Servidores",
            timestamp: "2024-10-28T14:18:00",
            type: "entry",
            status: "denied",
            details: "Sem permissão para área restrita - Nível 3 requerido"
        },
        {
            id: 4,
            userId: 4,
            userName: "Ana Costa",
            userRole: "Supervisora",
            userAvatar: "../assets/img/user4.png",
            area: "Almoxarifado",
            timestamp: "2024-10-28T14:10:00",
            type: "exit",
            status: "success",
            details: "Saída registrada - Material conferido"
        }
    ],

    userData: [
        { id: 1, name: "João Silva", status: "active", department: "Produção" },
        { id: 2, name: "Maria Santos", status: "active", department: "Laboratório" },
        { id: 3, name: "Carlos Oliveira", status: "blocked", department: "Manutenção" },
        { id: 4, name: "Ana Costa", status: "active", department: "Administrativo" }
    ],

    // Métodos de acesso aos dados
    getAccessById: function(id) {
        return this.accessData.find(access => access.id === id);
    },

    getUserById: function(id) {
        return this.userData.find(user => user.id === id);
    },

    getAccessDataForExport: function() {
        return this.accessData.map(access => ({
            ID: access.id,
            Usuário: access.userName,
            Função: access.userRole,
            Área: access.area,
            Data: new Date(access.timestamp).toLocaleDateString('pt-BR'),
            Hora: new Date(access.timestamp).toLocaleTimeString('pt-BR'),
            Tipo: access.type === 'entry' ? 'Entrada' : 'Saída',
            Status: access.status === 'success' ? 'Permitido' : 'Negado'
        }));
    },

    loadAccessData: function() {
        // Simula carregamento de novos dados
        console.log('Carregando dados de acesso...');
        // Em uma aplicação real, aqui viria uma requisição AJAX
    }
};

// ===== UI MANAGEMENT =====
const UIManager = {
    // ===== NOTIFICAÇÕES =====
    showNotification: function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span class="notification-icon">${this.getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.remove()">×</button>
        `;
        
        document.body.appendChild(notification);
        
        // Animação de entrada
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove após 5 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    },

    getNotificationIcon: function(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        return icons[type] || 'ℹ️';
    },

    // ===== MODAIS =====
    showAccessModal: function(accessData) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Detalhes do Acesso</h3>
                    <button class="close-btn" onclick="this.closest('.modal').remove()">×</button>
                </div>
                <div class="modal-body">
                    <div class="access-details">
                        <div class="detail-row">
                            <strong>Usuário:</strong>
                            <span>${accessData.userName}</span>
                        </div>
                        <div class="detail-row">
                            <strong>Função:</strong>
                            <span>${accessData.userRole}</span>
                        </div>
                        <div class="detail-row">
                            <strong>Área:</strong>
                            <span>${accessData.area}</span>
                        </div>
                        <div class="detail-row">
                            <strong>Data/Hora:</strong>
                            <span>${new Date(accessData.timestamp).toLocaleString('pt-BR')}</span>
                        </div>
                        <div class="detail-row">
                            <strong>Tipo:</strong>
                            <span class="badge ${accessData.type === 'entry' ? 'badge-entry' : 'badge-exit'}">
                                ${accessData.type === 'entry' ? 'Entrada' : 'Saída'}
                            </span>
                        </div>
                        <div class="detail-row">
                            <strong>Status:</strong>
                            <span class="status ${accessData.status === 'success' ? 'status-success' : 'status-error'}">
                                ${accessData.status === 'success' ? 'Permitido' : 'Negado'}
                            </span>
                        </div>
                        <div class="detail-row">
                            <strong>Detalhes:</strong>
                            <span>${accessData.details}</span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal').remove()">Fechar</button>
                    ${accessData.status === 'denied' ? 
                        '<button class="btn-primary" onclick="AppActions.unblockAccess(' + accessData.userId + ')">Liberar Acesso</button>' : 
                        '<button class="btn-warning" onclick="AppActions.blockAccess(' + accessData.userId + ')">Bloquear Acesso</button>'
                    }
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Fecha modal ao clicar fora
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    // ===== ATUALIZAÇÃO DE STATUS =====
    updateAccessStatus: function(userId, status) {
        const userRow = document.querySelector(`tr:has(.employee-info strong:contains("${DataManager.getUserById(userId).name}"))`);
        if (userRow) {
            if (status === 'blocked') {
                userRow.classList.add('access-denied');
                const statusCell = userRow.querySelector('.status');
                statusCell.className = 'status status-error';
                statusCell.textContent = 'Negado';
                
                // Atualiza botões
                const buttons = userRow.querySelector('.action-buttons');
                buttons.innerHTML = `
                    <button class="btn-icon" title="Visualizar detalhes" onclick="AppActions.viewAccessDetails(${userId})">👁️</button>
                    <button class="btn-icon" title="Liberar acesso" onclick="AppActions.unblockAccess(${userId})">✅</button>
                `;
            } else {
                userRow.classList.remove('access-denied');
                const statusCell = userRow.querySelector('.status');
                statusCell.className = 'status status-success';
                statusCell.textContent = 'Permitido';
                
                // Atualiza botões
                const buttons = userRow.querySelector('.action-buttons');
                buttons.innerHTML = `
                    <button class="btn-icon" title="Visualizar detalhes" onclick="AppActions.viewAccessDetails(${userId})">👁️</button>
                    <button class="btn-icon" title="Bloquear acesso" onclick="AppActions.blockAccess(${userId})">🚫</button>
                `;
            }
        }
    },

    updateAlertCount: function() {
        const alertCount = document.querySelectorAll('.alert-item').length;
        const badge = document.querySelector('.badge-warning');
        if (badge) {
            badge.textContent = alertCount + ' novos';
            if (alertCount === 0) {
                badge.style.display = 'none';
            }
        }
    },

    // ===== DOWNLOAD DE ARQUIVOS =====
    downloadCSV: function(data, filename) {
        const headers = Object.keys(data[0]);
        const csvContent = [
            headers.join(','),
            ...data.map(row => headers.map(header => `"${row[header]}"`).join(','))
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};

// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', function() {
    // Adiciona funcionalidade de busca
    const addSearchFunctionality = () => {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <input type="text" id="accessSearch" placeholder="Pesquisar acessos..." 
                   onkeyup="AppActions.searchAccess(this.value)">
            <span class="search-icon">🔍</span>
        `;
        
        const sectionHeader = document.querySelector('.section-header');
        sectionHeader.appendChild(searchContainer);
    };
    
    // Adiciona filtros rápidos
    const addQuickFilters = () => {
        const filterContainer = document.createElement('div');
        filterContainer.className = 'quick-filters';
        filterContainer.innerHTML = `
            <button class="filter-btn active" onclick="AppActions.filterByStatus('all')">Todos</button>
            <button class="filter-btn" onclick="AppActions.filterByStatus('allowed')">Permitidos</button>
            <button class="filter-btn" onclick="AppActions.filterByStatus('denied')">Bloqueados</button>
        `;
        
        const sectionHeader = document.querySelector('.recent-access .section-header');
        sectionHeader.appendChild(filterContainer);
    };
    
    // Inicializa componentes
    addSearchFunctionality();
    addQuickFilters();
    
    console.log('Sistema de Controle de Acesso inicializado!');
});

// ===== STYLES DINÂMICOS =====
const dynamicStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        border-left: 4px solid #166cc7;
        display: flex;
        align-items: center;
        gap: 10px;
        transform: translateX(100%);
        transition: transform 0.3s ease, opacity 0.3s ease;
        z-index: 10000;
        max-width: 400px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success { border-left-color: #28a745; }
    .notification-error { border-left-color: #dc3545; }
    .notification-warning { border-left-color: #ffc107; }
    .notification-info { border-left-color: #17a2b8; }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        color: #666;
        margin-left: auto;
    }
    
    .search-container {
        position: relative;
        margin-left: auto;
    }
    
    #accessSearch {
        padding: 8px 35px 8px 12px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 0.9rem;
        width: 250px;
    }
    
    .search-icon {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: #666;
    }
    
    .quick-filters {
        display: flex;
        gap: 5px;
        margin-left: 15px;
    }
    
    .filter-btn {
        padding: 6px 12px;
        border: 1px solid #ddd;
        background: white;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.8rem;
        transition: all 0.3s ease;
    }
    
    .filter-btn.active,
    .filter-btn:hover {
        background: #166cc7;
        color: white;
        border-color: #166cc7;
    }
    
    .access-details .detail-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        border-bottom: 1px solid #f0f0f0;
    }
    
    .access-details .detail-row:last-child {
        border-bottom: none;
    }
    
    .btn-warning {
        background: #ffc107;
        color: #212529;
    }
    
    .btn-warning:hover {
        background: #e0a800;
    }
`;

// Adiciona estilos dinâmicos
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);

// ===== EXPORTA FUNÇÕES GLOBAIS =====
Object.assign(AppActions, DataManager, UIManager);
window.AppActions = AppActions;

console.log('Módulo de Controle de Acesso carregado com sucesso!');