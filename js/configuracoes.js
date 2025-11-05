/**
 * CONFISAFE - Configurações
 * Gerenciamento de preferências e conta do usuário
 */

(function() {
  'use strict';

  // ===== ELEMENTOS DO DOM =====
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const logoutBtn = document.getElementById('logoutBtn');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  const profileForm = document.getElementById('profileForm');
  const passwordForm = document.getElementById('passwordForm');

  // ===== MENU MOBILE =====
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', function() {
      sidebar.classList.toggle('open');
    });

    document.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
          sidebar.classList.remove('open');
        }
      }
    });
  }

  // ===== LOGOUT =====
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      if (confirm('Deseja realmente sair do sistema?')) {
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = '../pages/login.html';
      }
    });
  }

  // ===== TABS =====
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetTab = this.dataset.tab;
      
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      this.classList.add('active');
      
      const targetContent = document.getElementById(targetTab + '-tab');
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // ===== FORMULÁRIO DE PERFIL =====
  if (profileForm) {
    profileForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const fullName = document.getElementById('fullName').value.trim();
      const email = document.getElementById('email').value.trim();
      const department = document.getElementById('department').value;
      const phone = document.getElementById('phone').value.trim();
      const ramal = document.getElementById('ramal').value.trim();

      if (!fullName || !email) {
        showNotification('Preencha todos os campos obrigatórios!', 'warning');
        return;
      }

      // Validação de e-mail
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showNotification('Digite um e-mail válido!', 'warning');
        return;
      }

      // Salvar no localStorage (simulação)
      const userData = {
        fullName,
        email,
        department,
        phone,
        ramal,
        lastUpdate: new Date().toISOString()
      };

      localStorage.setItem('confisafe_user_profile', JSON.stringify(userData));
      
      showNotification('✅ Perfil atualizado com sucesso!', 'success');
    });
  }

  // ===== FORMULÁRIO DE SENHA =====
  if (passwordForm) {
    passwordForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const currentPassword = document.getElementById('currentPassword').value;
      const newPassword = document.getElementById('newPassword').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      if (!currentPassword || !newPassword || !confirmPassword) {
        showNotification('Preencha todos os campos!', 'warning');
        return;
      }

      // Validação de senha
      if (newPassword.length < 8) {
        showNotification('A nova senha deve ter no mínimo 8 caracteres!', 'warning');
        return;
      }

      if (newPassword !== confirmPassword) {
        showNotification('As senhas não coincidem!', 'warning');
        return;
      }

      // Validação de complexidade
      const hasLetter = /[a-zA-Z]/.test(newPassword);
      const hasNumber = /\d/.test(newPassword);
      
      if (!hasLetter || !hasNumber) {
        showNotification('A senha deve conter letras e números!', 'warning');
        return;
      }

      // Simulação de alteração
      showNotification('✅ Senha alterada com sucesso! Faça login novamente.', 'success');
      
      setTimeout(() => {
        window.location.href = '../pages/login.html';
      }, 2000);
    });
  }

  // ===== INICIALIZAÇÃO =====
  console.log('✅ Configurações carregadas');
  loadUserData();

  // ===== CARREGAR DADOS DO USUÁRIO =====
  function loadUserData() {
    const savedData = localStorage.getItem('confisafe_user_profile');
    
    if (savedData) {
      try {
        const userData = JSON.parse(savedData);
        
        if (document.getElementById('fullName')) {
          document.getElementById('fullName').value = userData.fullName || '';
        }
        if (document.getElementById('email')) {
          document.getElementById('email').value = userData.email || '';
        }
        if (document.getElementById('department')) {
          document.getElementById('department').value = userData.department || 'seguranca';
        }
        if (document.getElementById('phone')) {
          document.getElementById('phone').value = userData.phone || '';
        }
        if (document.getElementById('ramal')) {
          document.getElementById('ramal').value = userData.ramal || '';
        }
      } catch (e) {
        console.error('Erro ao carregar dados do usuário:', e);
      }
    }
  }

})();

// ===== FUNÇÕES GLOBAIS =====

function resetForm() {
  if (confirm('Descartar alterações?')) {
    document.getElementById('profileForm').reset();
    showNotification('Alterações descartadas.', 'info');
  }
}

function previewAvatar(event) {
  const file = event.target.files[0];
  
  if (!file) return;

  // Validar tamanho (2MB)
  if (file.size > 2 * 1024 * 1024) {
    showNotification('❌ A imagem deve ter no máximo 2MB!', 'warning');
    event.target.value = '';
    return;
  }

  // Validar tipo
  if (!file.type.startsWith('image/')) {
    showNotification('❌ Por favor, selecione uma imagem válida!', 'warning');
    event.target.value = '';
    return;
  }

  const reader = new FileReader();
  
  reader.onload = function(e) {
    const preview = document.getElementById('avatarPreview');
    if (preview) {
      preview.src = e.target.result;
      showNotification('✅ Foto de perfil atualizada!', 'success');
    }
  };
  
  reader.readAsDataURL(file);
}

function removeAvatar() {
  if (confirm('Deseja realmente remover sua foto de perfil?')) {
    const preview = document.getElementById('avatarPreview');
    if (preview) {
      preview.src = '../assets/img/controle.png';
    }
    
    const input = document.getElementById('avatarInput');
    if (input) {
      input.value = '';
    }
    
    showNotification('Foto de perfil removida.', 'info');
  }
}

function saveNotifications() {
  const notifications = {
    emailAlertas: document.getElementById('emailAlertas').checked,
    emailRelatorios: document.getElementById('emailRelatorios').checked,
    emailTreinamentos: document.getElementById('emailTreinamentos').checked,
    pushNotifications: document.getElementById('pushNotifications').checked,
    soundAlerts: document.getElementById('soundAlerts').checked,
    lastUpdate: new Date().toISOString()
  };

  localStorage.setItem('confisafe_notifications', JSON.stringify(notifications));
  showNotification('✅ Preferências de notificação salvas!', 'success');
}

function revokeSession(sessionId) {
  if (confirm('Deseja realmente encerrar esta sessão?')) {
    showNotification('✅ Sessão encerrada com sucesso!', 'success');
    console.log('Sessão encerrada:', sessionId);
  }
}

function enable2FA() {
  showNotification('🔐 Abrindo configuração de 2FA...', 'info');
  
  setTimeout(() => {
    alert('CONFIGURAÇÃO DE 2FA\n\n' +
          '1. Baixe o app Google Authenticator\n' +
          '2. Escaneie o QR Code\n' +
          '3. Digite o código gerado\n\n' +
          'Em produção, isso abriria um modal com o processo completo.');
  }, 500);
}

function saveSystemPreferences() {
  const preferences = {
    theme: document.getElementById('themeSelect').value,
    language: document.getElementById('languageSelect').value,
    timezone: document.getElementById('timezoneSelect').value,
    lastUpdate: new Date().toISOString()
  };

  localStorage.setItem('confisafe_system_preferences', JSON.stringify(preferences));
  showNotification('✅ Preferências do sistema salvas!', 'success');
  
  // Aplicar tema (se for implementado)
  if (preferences.theme === 'dark') {
    showNotification('💡 Tema escuro será implementado em breve!', 'info');
  }
}

function exportData() {
  showNotification('📦 Preparando exportação de dados...', 'info');
  
  setTimeout(() => {
    const userData = {
      profile: JSON.parse(localStorage.getItem('confisafe_user_profile') || '{}'),
      notifications: JSON.parse(localStorage.getItem('confisafe_notifications') || '{}'),
      preferences: JSON.parse(localStorage.getItem('confisafe_system_preferences') || '{}'),
      exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(userData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'confisafe-dados-' + new Date().toISOString().split('T')[0] + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('✅ Dados exportados com sucesso!', 'success');
  }, 1500);
}

function deactivateAccount() {
  const confirmation = prompt('Digite "DESATIVAR" para confirmar a desativação da conta:');
  
  if (confirmation === 'DESATIVAR') {
    showNotification('⚠️ Conta desativada. Entre em contato com o suporte para reativar.', 'warning');
    
    setTimeout(() => {
      sessionStorage.clear();
      localStorage.clear();
      window.location.href = '../pages/login.html';
    }, 2000);
  } else if (confirmation !== null) {
    showNotification('Confirmação incorreta. Conta não foi desativada.', 'info');
  }
}

function deleteAccount() {
  const confirmation1 = prompt('⚠️ ATENÇÃO: Esta ação é IRREVERSÍVEL!\n\nTodos os seus dados serão permanentemente excluídos.\n\nDigite "EXCLUIR PERMANENTEMENTE" para confirmar:');
  
  if (confirmation1 === 'EXCLUIR PERMANENTEMENTE') {
    const confirmation2 = confirm('Tem ABSOLUTA CERTEZA?\n\nEsta é sua última chance de cancelar.\n\nTodos os dados serão perdidos para sempre!');
    
    if (confirmation2) {
      showNotification('❌ Conta excluída permanentemente.', 'danger');
      
      setTimeout(() => {
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = '../index.html';
      }, 2000);
    }
  } else if (confirmation1 !== null) {
    showNotification('Confirmação incorreta. Conta não foi excluída.', 'info');
  }
}

function showNotification(message, type = 'info') {
  // Remover notificações existentes
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());

  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  
  const colors = {
    success: '#28a745',
    warning: '#ffc107',
    info: '#166cc7',
    danger: '#dc3545'
  };
  
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    background: ${colors[type] || colors.info};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 9999;
    animation: slideIn 0.3s ease;
    max-width: 400px;
    font-weight: 500;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 4000);
}

// Animações CSS
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
`;
document.head.appendChild(style);